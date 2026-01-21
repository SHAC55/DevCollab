import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { applyForBid, getAllBidsByProblem, selectBidByProblem } from '../controllers/bid.controller.js';

const bidRouter  = express.Router();

bidRouter.post('/applyforbid/:problemId',authMiddleware,applyForBid)
bidRouter.get('/allbids/:problemId',getAllBidsByProblem)
bidRouter.patch('/select/:problemId/:bidId',authMiddleware,selectBidByProblem)


export default bidRouter;