import express from "express";
import {
  getCollabPointsLeaderBoard,
  getCommunityPointsLeaderBoard,
  getreputationPointsLeaderBoard,
} from "../controllers/leaderboard.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const leaderBoardRouter = express.Router();

leaderBoardRouter.get("/community",authMiddleware,getCommunityPointsLeaderBoard);
leaderBoardRouter.get("/collab",authMiddleware, getCollabPointsLeaderBoard);
leaderBoardRouter.get("/reputation",authMiddleware, getreputationPointsLeaderBoard);

export default leaderBoardRouter;
