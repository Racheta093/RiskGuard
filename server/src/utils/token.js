import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const signToken = (userId) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, { expiresIn: "30d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

export const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};
