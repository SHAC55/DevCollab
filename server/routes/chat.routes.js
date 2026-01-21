import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getRecentChats, getMessages } from "../controllers/chat.controller.js";

const chatRouter = express.Router();


chatRouter.get("/recent", authMiddleware, getRecentChats);
chatRouter.get("/:roomId", authMiddleware, getMessages);

export default chatRouter;
