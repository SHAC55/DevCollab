import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getAllSolutionsByProblem, reactionToSolution, selectTopSolution, submitSolution } from '../controllers/solution.controller.js';

const solutionRouter = express.Router();

solutionRouter.post('/submit-solution/:problemId',authMiddleware,submitSolution);
solutionRouter.get('/get-solutions/:problemId',getAllSolutionsByProblem)

// Reactions
solutionRouter.post('/react/:solutionId',authMiddleware,reactionToSolution);

// top solution selection
solutionRouter.post('/select-top/:problemId',authMiddleware,selectTopSolution);


export default solutionRouter;