import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import upload from '../middleWare/uploadMiddleware.js'; // Import the upload middleware

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
export const registerUser = asyncHandler(async (req, res) => {
    upload.single('photo')(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Photo upload failed" });
        }

        const { name, email, password, phone,regno, role, approved } = req.body;
        const photo = req.file ? `/uploads/${req.file.filename}` : null; // Use the uploaded file path

        // Validation
        if (!email || !name || !password) {
            res.status(400);
            throw new Error("Please fill in all required fields");
        }
        if (password.length < 6) {
            res.status(400);
            throw new Error("Password must be at least 6 characters");
        }
        if (!photo) {
            res.status(400);
            throw new Error("Please upload a photo");
        }

        // Check if user or email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400);
            throw new Error("The email is already used");
        }

        // Create a user
        const user = await User.create({
            name,
            email,
            password,
            phone,
            regno,
            photo,
            role,
            approved
        });

        // Generate Token
        const token = generateToken(user._id);

        // Send HTTP-only cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 Day
            sameSite: "none",
            secure: true
        });

        if (user) {
            const { _id, name, email, phone,regno, photo, role, approved } = user;
            res.status(201).json({
                _id, name, email, phone,regno, photo, role, approved, token
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    });
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add an email and password");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User not found, please sign up");
    }

    // Check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    // Generate Token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 Day
        sameSite: "none",
        secure: true
    });

    if (user && passwordIsCorrect) {
        const { _id, name, email, phone, regno, photo, role, approved } = user;
        res.status(200).json({
            message: "Login successful",
            _id, name, email, phone, photo,regno, role, approved, token
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

// Get all users
export const getAll = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
//Getting a user by id:
export const getById = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  
// Update a user
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;

    try {
        const foundUser = await User.findById(userId);

        if (!foundUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update the foundUser object with the provided data
        Object.assign(foundUser, updatedData);

        // Save the updated user
        const updatedUser = await foundUser.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Logout the user
export const logout = asyncHandler(async (req, res) => {
    // Send HTTP-only cookie 
    res.cookie("token", " ", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true
    });
    // Set cache control headers to prevent caching
    res.set('Cache-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    return res.status(200).json({ message: "Successfully logged out" });
});
