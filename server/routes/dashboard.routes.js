import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUserDashboardStats } from "../controllers/dashboard.controller.js";

const dashRouter = express.Router();

dashRouter.get("/user-stats", authMiddleware, getUserDashboardStats);

export default dashRouter;
