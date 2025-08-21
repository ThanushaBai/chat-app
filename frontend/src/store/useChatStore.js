import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  typingUsers: [],

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });

    // Typing indicators
    socket.on("typing:start", (data) => {
      if (data.senderId === selectedUser._id) {
        set({
          typingUsers: [...get().typingUsers, data.senderId]
        });
      }
    });

    socket.on("typing:stop", (data) => {
      set({
        typingUsers: get().typingUsers.filter(id => id !== data.senderId)
      });
    });

    // Read receipts
    socket.on("message:read", (data) => {
      const { messageId } = data;
      set({
        messages: get().messages.map(msg => 
          msg._id === messageId ? { ...msg, isRead: true, readAt: data.readAt } : msg
        )
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("typing:start");
    socket.off("typing:stop");
    socket.off("message:read");
  },

  sendTypingIndicator: (isTyping) => {
    const { selectedUser } = get();
    const socket = useAuthStore.getState().socket;
    const authUser = useAuthStore.getState().authUser;

    if (!selectedUser || !socket || !authUser) return;

    if (isTyping) {
      socket.emit("typing:start", {
        receiverId: selectedUser._id,
        senderName: authUser.name
      });
    } else {
      socket.emit("typing:stop", {
        receiverId: selectedUser._id
      });
    }
  },

  markMessageAsRead: async (messageId) => {
    try {
      await axiosInstance.patch(`/messages/read/${messageId}`);
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));