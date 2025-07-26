import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../lib/apiResponse.js";
import { generateToken } from "../lib/utils.js";
import { uploadToCloudinary } from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json(new ApiResponse(400, "All fields are required!"));
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json(new ApiResponse(400, "User with email alredy exist!"));
    }

    if (password.length < 6) {
      return res.status(400).json(new ApiResponse(400, "Password must be at least 6 charactors!"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json(new ApiResponse(400, "Invalid user data!"));
    }

    // generate token and set token
    generateToken({ _id: user._id }, res);

    return res.status(201).json(new ApiResponse(201, "User created successfully", { ...user._doc, password: undefined }));
  } catch (error) {
    console.error("User Signup Error :: ", error);
    return res.status(500).json(new ApiResponse(500, error.message, error));
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json(new ApiResponse(400, "Invalid email or password!"));
    }

    const isPasswordCurrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCurrect) {
      return res.status(400).json(new ApiResponse(400, "Invalid email or password!"));
    }

    // generate token and set token
    generateToken({ _id: user._id }, res);

    return res.status(200).json(new ApiResponse(200, "User login successfully", { ...user._doc, password: undefined }));
  } catch (error) {
    console.error("User Login Error :: ", error);
    return res.status(500).json(new ApiResponse(500, error.message, error));
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json(new ApiResponse(200, "User logout successfully"));
  } catch (error) {
    console.error("User Logout Error :: ", error);
    return res.status(500).json(new ApiResponse(500, error.message, error));
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profilePic = req.file?.path;
    const { _id } = req.user;

    if (!profilePic) {
      return res.status(400).json(new ApiResponse(400, "Profile pic required!"));
    }

    const image = await uploadToCloudinary(profilePic);

    if (!image) {
      return res.status(400).json(new ApiResponse(400, "Faild to update profile!"));
    }

    const user = await User.findByIdAndUpdate(
      _id,
      { profilePic: image.secure_url },
      { new: true }
    ).select("-password");

    return res.status(200).json(new ApiResponse(200, "Profile update successfully", user));
  } catch (error) {
    console.error("Update Profile Logout Error :: ", error);
    return res.status(500).json(new ApiResponse(500, error.message, error));
  }
};

export const checkAuth = async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, "Authenticated user", req.user));
  } catch (error) {
    console.error("Check Auth Error :: ", error);
    return res.status(500).json(new ApiResponse(500, error.message, error));
  }
};
