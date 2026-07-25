import User from "../../models/User.js";
import { signToken } from "../../utils/token.js";

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });

  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const user = await User.create({ name, email, password });
  const token = signToken(user._id);

  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password.");
  }

  const token = signToken(user._id);

  return { user, token };
};
