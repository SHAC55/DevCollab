import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getActiveProblems,
  getProblemById,
  getUserAllProblems,
  markSolved,
  postProblem,
} from "../controllers/problem.controller.js";

const problemRouter = express.Router();

problemRouter.post("/post", authMiddleware, postProblem);

problemRouter.get("/active-problems", getActiveProblems);

problemRouter.get("/myproblems", authMiddleware, getUserAllProblems);

problemRouter.get("/:id", getProblemById);

problemRouter.post("/markedassolved/:problemId", authMiddleware, markSolved);

export default problemRouter;
