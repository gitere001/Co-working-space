import express from "express";
import { addUser, getAuthenticatedUser, loginUser, logoutUser } from "../controllers/auth.controllers.js";
import { authenticateSession } from "../middlewares/authenicateSession.js";


const authRouter = express.Router();

authRouter.post("/register", addUser);

authRouter.post("/login",  loginUser)

authRouter.post("/logout", logoutUser);
authRouter.get("/user", authenticateSession, getAuthenticatedUser)


export default authRouter;