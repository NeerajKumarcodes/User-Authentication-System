import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Express app
const app = express();
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// CORS
app.use(cors());

// Environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Server connection
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  connectDB();
});

export default app;