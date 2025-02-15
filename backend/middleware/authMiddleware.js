import jwt from "jsonwebtoken";
import { User } from "./../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const protectRoute = async (req, res, next) => {
    try {
        
        // Get token from header
        const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "Not authorized to access this route"});
        }

        const JWT_SECRET = process.env.JWT_SECRET;

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(500).json({message: "Not authorized to access this route"});
        next(error);
    }
};