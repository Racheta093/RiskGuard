import { registerUser, loginUser } from "../services/auth/auth.service.js";
import { cookieOptions } from "../utils/token.js";

const sanitize = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const { user, token } = await registerUser({ name, email, password });

    res.cookie("token", token, cookieOptions);

    res.status(201).json({ success: true, user: sanitize(user) });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const { user, token } = await loginUser({ email, password });

    res.cookie("token", token, cookieOptions);

    res.json({ success: true, user: sanitize(user) });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ success: true });
};

export const me = async (req, res) => {
  res.json({ success: true, user: sanitize(req.user) });
};
