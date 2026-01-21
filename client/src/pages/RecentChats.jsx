import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/chatContext";

import {
  MessageSquare,
  Search,
  Clock,
  User,
  Hash,
  Sparkles,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

const RecentChats = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { recentChats, fetchRecentChats } = useChat();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRecentChats();
  }, []);

  // Filter chats
  const filteredChats = recentChats.filter((chat) => {
    const otherUser =
      chat.sender._id === user._id ? chat.receiver : chat.sender;

    return (
      otherUser.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (chat.problemTitle &&
        chat.problemTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      chat.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatTime = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    if (diffInMinutes < 2880) return "Yesterday";
    return messageDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  };

  const getAvatarGradient = (username) => {
    const gradients = [
      "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500",
      "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500",
      "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
      "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500",
      "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500",
    ];
    const index = username.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Conversations</h1>
          {recentChats.length > 0 && (
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              {recentChats.length} active
            </span>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl mb-10">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-14 pr-5 py-4 border rounded-2xl"
        />
      </div>

      {/* Empty */}
      {filteredChats.length === 0 && (
        <div className="text-center py-20">
          <MessageSquare className="mx-auto w-12 h-12 text-gray-300 mb-4" />
          <p className="text-gray-500">No conversations found</p>
        </div>
      )}

      {/* Chat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredChats.map((chat) => {
          const otherUser =
            chat.sender._id === user._id ? chat.receiver : chat.sender;

          const avatarGradient = getAvatarGradient(otherUser.username);

          return (
            <div
              key={chat.roomId}
              onClick={() =>
                navigate(`/chat/${chat.roomId}`, {
                  state: {
                    otherUserId: otherUser._id,
                    otherUserName: otherUser.username,
                  },
                })
              }
              className="bg-white p-5 rounded-2xl border hover:shadow-lg cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${avatarGradient} flex items-center justify-center text-white font-bold`}
                  >
                    {otherUser.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{otherUser.username}</h3>
                    <p className="text-xs text-gray-500">
                      {formatTime(chat.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Problem */}
              {chat.problemTitle && (
                <div className="mb-2 flex items-center gap-1 text-xs text-indigo-700">
                  <Hash className="w-3 h-3" />
                  {chat.problemTitle}
                </div>
              )}

              {/* Message */}
              <p className="text-gray-600 text-sm line-clamp-2">
                {chat.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentChats;
