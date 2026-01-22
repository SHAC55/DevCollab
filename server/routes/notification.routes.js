import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/notification.controller.js";

const notifyRouter = express.Router();

notifyRouter.get("/", authMiddleware, getMyNotifications);

notifyRouter.put("/read/:id", authMiddleware, markNotificationRead);

notifyRouter.put("/read-all", authMiddleware, markAllNotificationsRead);

export default notifyRouter;
