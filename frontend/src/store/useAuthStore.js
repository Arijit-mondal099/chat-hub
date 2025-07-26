import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/auth/check-auth");
      set({ authUser: data?.data });
      // *** If user is authenticated, then connect user with socket
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (credentials) => {
    try {
      set({ isSigningUp: true });
      const { data } = await axiosInstance.post("/api/v1/auth/signup", credentials);
      set({ authUser: data?.data });
      toast.success("Account created successfully");
      // *** If user is signup, then connect user with socket
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials) => {
    try {
      set({ isLoggingIn: true });
      const { data } = await axiosInstance.post("/api/v1/auth/login", credentials);
      set({ authUser: data?.data });
      toast.success("Login successfully");
      // *** If user is login, then connect user with socket
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/api/v1/auth/logout");
      set({ authUser: null });
      toast.success("Loggedout successfully");
      // *** If user is logout, then disconnect user from socket
      get().disconnectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      set({ authUser: null });
    }
  },

  updateProfile: async (credentials) => {
    try {
      set({ isUpdatingProfile: true });
      const { data } = await axiosInstance.put("/api/v1/auth/update-profile", credentials);
      set({ authUser: data?.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      set({ authUser: null });
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  /**
   * Socket.io client configrution
   * @function connectSocket() for connect user with socket
   * @function disconnectSocket() for disconnect user from socket
   */

  connectSocket: () => {
    // if user isn't authenticated or alredy connected, then don't connect
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, { query: { userId: authUser?._id }});
    socket.connect();

    socket.on("getOnlineUsers", (onlineUsersId) => {
      set({ onlineUsers: onlineUsersId });
    });

    socket.on("userDisconnected", (onlineUsersId) => {
      set({ onlineUsers: onlineUsersId });
    });

    set({ socket: socket });
  },

  disconnectSocket: () => {
    if ( get().socket?.connected ) get().socket.disconnect();
  },
}));
