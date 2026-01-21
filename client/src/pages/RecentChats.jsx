import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const RecentChats = () => {
  const [chats, setChats] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRecentChats = async () => {
      try {
        const res = await api.get("/chat/recent",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        setChats(res.data);
      } catch (err) {
        console.error("Fetch recent chats error:", err);
      }
    };

    fetchRecentChats();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
      <h2 className="text-lg font-semibold px-5 py-4 border-b">
        Recent Chats
      </h2>

      {chats.length === 0 && (
        <p className="p-6 text-gray-500 text-center">
          No conversations yet
        </p>
      )}

      {chats.map((chat) => {
        const otherUser =
          chat.sender._id === user._id ? chat.receiver : chat.sender;

        return (
          <div
            key={chat.roomId}
            onClick={() => navigate(`/chat/${chat.roomId}`)}
            className="flex items-center gap-4 px-5 py-4 border-b hover:bg-gray-50 cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
              {otherUser.username?.charAt(0).toUpperCase()}
            </div>

            {/* Name + Last Message */}
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                {otherUser.username}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {chat.text}
              </p>
            </div>

            {/* Time */}
            <div className="text-xs text-gray-400">
              {new Date(chat.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentChats;
    