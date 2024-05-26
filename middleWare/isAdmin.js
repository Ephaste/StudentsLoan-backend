import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;
    console.log("ygoooooooooooooooooo",decoded._id);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }

    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
