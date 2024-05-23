import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const protect = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401);
            throw new Error("Not authorised, please login");
        }
        
        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            res.status(401);
            throw new Error("Token verification failed");
        }

        // Get the user id from token
        const user = await User.findById(verified.id).select("-password");
        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }
        
        // Attach the user object to the request for further use
        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorised, please login");
    }
});

export default protect;
