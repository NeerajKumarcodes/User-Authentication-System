import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "./../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Generate JWT token
const generateToken = (userId) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    return jwt.sign({id: userId}, JWT_SECRET, {expiresIn: "7d"});
};

// Sign up user
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const newUser = await User.create({ name, email, password: hashedPassword });
        const token = generateToken(newUser._id);

        res.status(201).json({
            message: `Welcome ${newUser.name}`,
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        console.log(error.message);
    }
};

// Log in user
export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for:", email);

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid Email" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        console.log("Password Match:", comparePassword);

        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = generateToken(user._id);

        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: `Welcome back ${user.name}`,
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Log out user
export const logOut = (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "User logged out successfully" });
  };
  
