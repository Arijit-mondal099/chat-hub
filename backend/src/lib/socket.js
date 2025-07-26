import http from "http";
import express from "express";
import { Server } from "socket.io";

// create a http server with express app
const app = express();
const server = http.createServer(app);

// create sockct server with http server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

// Used to track online users: { userId: socketId }
const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// listening for connection event
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // listening for disconnect event
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    // emit userDisconnected event for all users
    io.emit("userDisconnected", Object.keys(userSocketMap));
  });
});

export { io, app, server };
