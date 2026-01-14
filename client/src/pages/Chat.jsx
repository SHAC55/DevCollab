import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import axios from "axios";
import { useAuth } from "../context/authContext";

const Chat = () => {
  const { problemId } = useParams();
  const { user } = useAuth();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);

  const fetchMessages = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/bid/messages/${problemId}`
    );
    setMessages(res.data);
  };

  // join room + receive messages
  useEffect(() => {
    fetchMessages();
    socket.emit("join_room", problemId);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, [problemId]);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const data = {
      roomId: problemId,
      senderId: user._id,
      senderName: user.username,
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", data);
    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b bg-white font-semibold">Project Chat</div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <div
            key={m._id || i}
            className={`max-w-xs p-3 rounded-lg text-sm ${
              m.senderId?.toString() === user._id
                ? "ml-auto bg-indigo-600 text-white"
                : "bg-white border"
            }`}
          >
            <p className="text-xs font-bold mb-1">{m.senderName}</p>
            <p>{m.text}</p>
            <p className="text-[10px] mt-1 opacity-70">
              {new Date(m.createdAt).toLocaleTimeString()}
            </p>
          </div>
        ))}

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
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
