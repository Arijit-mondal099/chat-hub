import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isMessageSending: false,

  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const { data } = await axiosInstance.get("/api/v1/messages/users");
      set({ users: data?.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      set({ users: [] });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (id) => {
    try {
      set({ isMessagesLoading: true });
      const { data } = await axiosInstance.get(`/api/v1/messages/${id}`);
      set({ messages: data?.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      set({ messages: [] });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (message) => {
    try {
      set({ isMessageSending: true });
      const { messages, selectedUser } = get();
      const { data } = await axiosInstance.post(`/api/v1/messages/send/${selectedUser._id}`, message);
      set({ messages: [...messages, data.data] });
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      set({ isMessageSending: false });
    }
  },

  /**
   * Realtime messageing
   * @function subscribeMessages() for connect
   * @function unSubscribeMessages() for disconnect
   */

  subscribeMessages: () => {
    try {
      if (!get().selectedUser) return;

      const socket = useAuthStore.getState().socket;

      socket.on("newMessage", (newMessage) => {
        // OPTIMZATION: is message send from selected user? if not then nothing update to UI
        if ( newMessage.senderId !== get().selectedUser._id ) return;
        set({ messages: [...get().messages, newMessage] });
      });
    } catch (error) {
      console.error(error.message);
    }
  },

  unSubscribeMessages: () => {
    try {
      const socket = useAuthStore.getState().socket;
      socket.off("newMessage");
    } catch (error) {
      console.error(error.message);
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
    localStorage.setItem("selectedUser", JSON.stringify(user));
  },
}));
