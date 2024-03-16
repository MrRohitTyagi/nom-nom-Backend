import express from "express";
import { getUserByToken, login, signUp } from "../handlers/userHandler.js";
const userRouter = express.Router();

//post User
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.get("/get", getUserByToken);
export default userRouter;
