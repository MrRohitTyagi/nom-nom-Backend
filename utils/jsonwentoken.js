import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function generateToken(payload) {
  const signature = process.env.JWT_SIGNATURE;
  const token = jwt.sign(payload, signature);
  return token;
}

export function VerifyToken() {}
// export function generateToken() {}
