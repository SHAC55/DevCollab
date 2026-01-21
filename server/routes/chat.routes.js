    import express from "express";
    import { authMiddleware } from "../middlewares/authMiddleware.js";
    import { getMessages, getRecentChats } from "../controllers/chat.controller.js";


    const chatRouter = express.Router();

    chatRouter.get('/messages/:roomId',getMessages)
    chatRouter.get("/recent", authMiddleware, getRecentChats);

    export default chatRouter;
