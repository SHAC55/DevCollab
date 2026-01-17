import  express from 'express'
import { getCollabPointsLeaderBoard, getCommunityPointsLeaderBoard, getreputationPointsLeaderBoard } from '../controllers/leaderboard.controller.js';

const leaderBoardRouter = express.Router()

leaderBoardRouter.get("/community",getCommunityPointsLeaderBoard)
leaderBoardRouter.get("/collab",getCollabPointsLeaderBoard)
leaderBoardRouter.get("/reputation",getreputationPointsLeaderBoard)

export  default leaderBoardRouter;