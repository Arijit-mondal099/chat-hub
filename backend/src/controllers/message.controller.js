import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { ApiResponse } from "../lib/apiResponse.js";
import { uploadToCloudinary } from "../lib/cloudinary.js";
import { io, getReceiverSocketId } from "../lib/socket.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user?._id;
    // get all users except you(loggedInUser)
    const users = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
    return res.status(200).json(new ApiResponse(200, "Users fetched successfully", users));
  } catch (error) {
    console.error("Get Users Error :: ", error);
    return res.status(500).json(new ApiResponse(500, error.message, error));
  }
};

export const getMessages = async (req, res) => {
  try {
    const userToChatId = req.params?.id;
    const user = req.user?._id;

    const messages = await Message.find({
      $or: [
        { senderId: user, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: user },
      ],
    });

    return res.status(200).json(new ApiResponse(200, "Messages fetched successfully", messages));
  } catch (error) {
    console.error("Get Messages Error :: ", error);
    return res.status(500).json(new ApiResponse(500, error.message, error));
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const image = req.file?.path;

    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if ( image ) { // if image is present
      const uploadRes = await uploadToCloudinary(image);
      imageUrl = uploadRes?.secure_url;
    }

    const message = await Message.create({
      receiverId,
      senderId,
      text,
      image: imageUrl,
    });

    // Realtime send to user
    const receiverSocketId = getReceiverSocketId(receiverId);
    if ( receiverSocketId ) { // if exit the receiver is online
      io.to(receiverSocketId).emit("newMessage", message);
    }

    return res.status(201).json(new ApiResponse(201, "Message sent successfully", message));
  } catch (error) {
    console.error("Send Message Error :: ", error);
    return res.status(500).json(new ApiResponse(500, error.message, error));
  }
};
