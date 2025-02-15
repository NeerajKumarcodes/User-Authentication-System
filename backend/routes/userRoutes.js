import express from "express";
import { protectRoute } from './../middleware/authMiddleware.js';
import { getUserProfile } from "../controllers/userController.js";

// Create a new router
const router = express.Router();

router.get("/profile", protectRoute, getUserProfile);

export default router;