import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../lib/apiResponse.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json(new ApiResponse(401, "Unauthorized - No token provided!"));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return res.status(401).json(new ApiResponse(401, "Unauthorized - Invalid token!"));
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error("Protect Route Error :: ", error);
    return res.status(401).json(new ApiResponse(401, "Unauthorized - Invalid token!"));
  }
};
