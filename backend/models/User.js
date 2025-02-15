import mongoose from "mongoose";
import { capitalizeName, hashPassword } from "../middleware/userMiddleware.js";

// User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        minlength: [3, "Name can not be less than 3 characters"],
        maxlength: [50, "Name can not be more than 50 characters"],
        match: [/^[a-zA-Z ]+$/, "Name can only contain alphabets and spaces"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password can not be less than 6 characters"],
        select: false,
    },
});

// Pre-save middleware
userSchema.pre("save", capitalizeName);
userSchema.pre("save", hashPassword);

// Export User model
export const User = mongoose.model("User", userSchema);