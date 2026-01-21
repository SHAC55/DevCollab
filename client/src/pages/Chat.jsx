import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useChat } from "../context/chatContext";

const Chat = () => {
  const { problemId } = useParams(); // roomId
  const location = useLocation();
  const { user } = useAuth();

  const navOtherUserId = location.state?.otherUserId;
  const navOtherUserName = location.state?.otherUserName;

  const [message, setMessage] = useState("");
  const [chatUser, setChatUser] = useState(null);

  const bottomRef = useRef(null);

  const {
    messages,
    fetchMessages,
    joinRoom,
    sendMessage: sendSocketMessage,
  } = useChat();

  // FETCH + JOIN ROOM
  useEffect(() => {
    const load = async () => {
      const oldMsgs = await fetchMessages(problemId);

      // fallback if page refreshed
      if (!navOtherUserId && oldMsgs?.length > 0) {
        const firstMsg = oldMsgs[0];
        const other =
          firstMsg.sender._id === user._id
            ? firstMsg.receiver
            : firstMsg.sender;
        setChatUser(other);
      }
    };

    load();
    joinRoom(problemId);
  }, [problemId]);

  // AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // SEND MESSAGE
  const handleSend = () => {
    if (!message.trim()) return;

    const receiverId = navOtherUserId || chatUser?._id;

    if (!receiverId) {
      console.error("Receiver missing");
      return;
    }

    sendSocketMessage({
      roomId: problemId,
      senderId: user._id,
      receiverId,
      text: message,
    });

    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b bg-white font-semibold">
        Chat with {navOtherUserName || chatUser?.username || "User"}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => {
          const senderId =
            typeof m.sender === "string" ? m.sender : m.sender?._id;

          const isMe = senderId === user._id;

          return (
            <div
              key={m._id || i}
              className={`max-w-xs p-3 rounded-lg text-sm ${
                isMe
                  ? "ml-auto bg-indigo-600 text-white"
                  : "bg-white border"
              }`}
            >
              {!isMe && (
                <p className="text-xs font-bold mb-1">
                  {m.sender?.username}
                </p>
              )}
              <p>{m.text}</p>
              <p className="text-[10px] mt-1 opacity-70">
                {new Date(m.createdAt).toLocaleTimeString()}
              </p>
            </div>
          );
        })}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
