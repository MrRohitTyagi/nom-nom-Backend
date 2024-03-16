import userModel from "../models/userModel.js";
import { VerifyToken, generateToken } from "../utils/jsonwentoken.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    let user = await userModel.create(req.body);
    user = user.toObject();

    delete user.password;
    delete user.__v;

    const token = generateToken(user);
    res.send({ success: true, user, token });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: error?.message || "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { email = "", password = "" } = req.body;
  try {
    let user = await userModel.findOne({ email: email.trim() });
    if (!user) return res.status(400).send({ msg: "User does not exists" });
    user = user.toObject();
    //if user is found by email
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!isPasswordSame) {
      return res.status(400).send({
        msg: "Password does not match ,please enter the correct password",
      });
    }

    delete user.password;
    delete user.__v;

    const token = generateToken(user);

    res.send({ success: true, user, token });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: error?.message || "Something went wrong" });
  }
};

export const getUserByToken = async (req, res) => {
  try {
    const token = req.headers["token"];
    const decodedUser = VerifyToken(token);
    return res.send({ user: decodedUser });
  } catch (error) {
    console.log("error", error);
    if (error.code === 401) {
      return res.status(401).send({
        success: false,
        msg: error.message,
      });
    } else {
      return res.status(500).send({
        success: false,
        msg: error?.message || "Something went wrong",
      });
    }
  }
};
