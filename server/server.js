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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// HTTP SERVER
const server = http.createServer(app);

// SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// DB connection
connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("DevCollab server is running!");
});

app.use("/api/auth", authRouter);
app.use("/api/problem", problemRouter);
app.use("/api/solution", solutionRouter);
app.use("/api/bid", bidRouter);

// ================= SOCKET LOGIC =================

io.on("connection", (socket) => {
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_message", async (data) => {
    // save to  db
    const savedMsg = await chatModel.create({
      roomId: data.roomId,
      senderId: data.senderId,
      senderName: data.senderName,
      text: data.text,
    });

    // send to  room
   io.to(data.roomId).emit("receive_message", savedMsg);

  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
