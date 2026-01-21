import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { socket } from "../socket";
import { useAuth } from "./authContext";

const ChatContext = createContext(null);

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();

  const [recentChats, setRecentChats] = useState([]);
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");

  // ================= API =================

  const fetchRecentChats = async () => {
    try {
      const res = await api.get("/chat/recent", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecentChats(res.data);
      return res.data;
    } catch (err) {
      console.error("Fetch recent chats error:", err);
    }
  };

  const fetchMessages = async (roomId) => {
    try {
      const res = await api.get(`/chat/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
      return res.data;
    } catch (err) {
      console.error("Fetch messages error:", err);
    }
  };

  // ================= SOCKET =================

  const joinRoom = (roomId) => {
    socket.emit("join_room", roomId);
  };

  const sendMessage = (data) => {
    socket.emit("send_message", data);
  };

  useEffect(() => {
    const handler = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handler);

    return () => socket.off("receive_message", handler);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        recentChats,
        messages,
        fetchRecentChats,
        fetchMessages,
        joinRoom,
        sendMessage,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
