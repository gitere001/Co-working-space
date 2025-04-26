import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const registerUser = async (payload) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/auth/register`, payload, {
      withCredentials: true
    });

    console.log(response);

    // Ensure that the message from backend is returned exactly
    if (response.data?.success) {
      return { success: true, message: response.data.message || "User registered successfully" };
    } else {
      return { success: false, message: response.data.message || "Error registering" };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message || "Error registering" };
  }
};

export default registerUser;
