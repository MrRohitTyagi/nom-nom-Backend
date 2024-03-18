import express from "express";
import { getUserByToken, updateUser } from "../handlers/userHandler.js";
import { VerifyToken } from "../utils/jsonwentoken.js";
import { login, signUp } from "../handlers/authHandlers.js";
const userRouter = express.Router();

//post User
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/regester-restraunt", login);

userRouter.get("/get", tokenVerifyMiddleware, getUserByToken);
userRouter.put("/update", tokenVerifyMiddleware, updateUser);

function tokenVerifyMiddleware(req, res, next) {
  try {
    const token = req.headers["token"];
    const decodeduser = VerifyToken(token);
    if (decodeduser) {
      req.headers.user_id = decodeduser._id;
    }
    next();
  } catch (error) {
    console.log("error", error);

    return res.status(401).send({
      success: false,
      msg: error.message,
    });
  }
}
export default userRouter;
