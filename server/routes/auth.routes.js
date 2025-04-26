import express from "express";
import { addUser, loginUser, logoutUser } from "../controllers/auth.controllers.js";


const authRouter = express.Router();

authRouter.post("/register", addUser);

authRouter.post("/login",  loginUser)

authRouter.post("/logout", logoutUser);


export default authRouter;