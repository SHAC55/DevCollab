import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/DBconnection.js";
import authRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";
import solutionRouter from "./routes/solution.routes.js";
import bidRouter from "./routes/bid.routes.js";
import chatModel from "./models/chatModel.js";
import leaderBoardRouter from "./routes/leaderboard.routes.js";
import dashRouter from "./routes/dashboard.routes.js";
import chatRouter from "./routes/chat.routes.js";
import { type } from "os";
import notifyRouter from "./routes/notification.routes.js";
import { sendNotification } from "./utils/sendNotification.js";
import notificationModel from "./models/notificationModel.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// HTTP SERVER
const server = http.createServer(app);

// SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","https://devcollab-bice.vercel.app/"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// DB connection
connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173","https://devcollab-bice.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("DevCollab server is running!");
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/problem", problemRouter);
app.use("/api/solution", solutionRouter);
app.use("/api/bid", bidRouter);
app.use("/api/leaderboard", leaderBoardRouter);
app.use("/api/dashboard", dashRouter);
app.use("/api/chat", chatRouter);
app.use("/api/notification", notifyRouter);

// ================= SOCKET LOGIC =================

// For chat
io.on("connection", (socket) => {
  // console.log("User connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    // console.log("Joined room:", roomId);
  });

 socket.on("send_message", async (data) => {
  try {
    const savedMsg = await chatModel.create({
      roomId: data.roomId,
      sender: data.senderId,
      receiver: data.receiverId,
      text: data.text,
    });

    const populatedMsg = await savedMsg.populate(
      "sender receiver",
      "username"
    );

    // send message to room
    io.to(data.roomId).emit("receive_message", populatedMsg);

    // CREATE NOTIFICATION IN DB
    const notification = await notificationModel.create({
      user: data.receiverId,
      type: "MESSAGE",
      text: `💬 New message from ${populatedMsg.sender.username}`,
      link: `/chat/${data.roomId}`,
    });

    //  REAL-TIME NOTIFICATION TO RECEIVER
    io.to(data.receiverId).emit("new_notification", notification);

  } catch (err) {
    console.error("Socket message save error:", err);
  }
});


  socket.on("disconnect", () => {
    // console.log("User disconnected:", socket.id);
  });
});

//

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
