import express from "express";
import { createUser } from "../handlers/userHandler.js";
const userRouter = express.Router();

//post User
userRouter.post("/create", createUser);
export default userRouter;
