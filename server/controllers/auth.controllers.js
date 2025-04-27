import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js"

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '5m' }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '5m' }
  );

  return { accessToken, refreshToken };
};

export const addUser = async (req, res) => {
  try {
    const { firstName, lastName, password, email, role } = req.body;
    console.log(req.body);

    if (!firstName || !lastName || !password || !email) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    console.log(existingUser);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    user.lastLogin = new Date();
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 60 * 60 * 1000,
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      accessToken
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error, please try again' });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'Refresh token required' });
    }

    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.userId);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'New tokens issued',
      role: user.role,
      accessToken
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).json({ success: true, message: 'Logout successful' });
};

export const getAuthenticatedUser = (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found."
      });
    }

    res.status(200).json({
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again."
    });
  }
};
