import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
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

const __dirname = path.resolve();
const NODE_ENV = process.env.NODE_ENV;



if(NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend")));
  
  app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
  });

  app.get("/frontend/index.html", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
  });

  app.get("/frontend/signup.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "signup.html"));
  });

  app.get("/frontend/login.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "login.html"));
  });

  app.get("/frontend/profile.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "profile.html"));
  });

  app.get("/frontend/logout.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "logout.html"));
  });

};

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Server connection
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  connectDB();
});

export default app;
