import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.router.js";
import documentRoutes from "./routes/document.router.js";
import chatRoutes from "./routes/chat.router.js";
import conversationRoutes from "./routes/conversation.router.js";
import aiRoutes from "./routes/ai.router.js";
import { protect } from "./middleware/auth.middleware.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://docu-mind-three-chi.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/documents", protect, documentRoutes);
app.use("/api/v1/chat", protect, chatRoutes);
app.use("/api/v1/conversations", protect, conversationRoutes);
app.use("/api/v1/ai", protect, aiRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to DocuMind API",
  });
});

export default app;
