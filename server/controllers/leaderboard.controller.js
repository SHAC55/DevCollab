import userModel from "../models/userModel.js";

export const getCommunityPointsLeaderBoard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; 

    const communityLeaderboard = await userModel
      .find({})
      .sort({ communityPoints: -1 })
      .limit(limit)
      .select("username profession communityPoints ");

    res.status(200).json({
      success: true,
      count: communityLeaderboard.length,
      communityLeaderboard,
    });
  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getCollabPointsLeaderBoard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; 

    const collabLeaderboard = await userModel
      .find({})
      .sort({ collabPoints: -1 })
      .limit(limit)
      .select("username profession email collabPoints");

    res.status(200).json({
      success: true,
      count: collabLeaderboard.length,
      collabLeaderboard,
    });
  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getreputationPointsLeaderBoard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; 

    const reputationLeaderboard = await userModel
      .find({})
      .sort({ reputationPoints: -1 })
      .limit(limit)
      .select("username profession email reputationPoints");

    res.status(200).json({
      success: true,
      count: reputationLeaderboard.length,
      reputationLeaderboard,
    });
  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
