import userModel from "../models/userModel.js";

export const getCommunityPointsLeaderBoard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // TOp 10 user
    const communityLeaderboard = await userModel
      .find({})
      .sort({ communityPoints: -1 })
      .limit(limit)
      .select("username profession communityPoints ");

    // My rank
    const me = await userModel.findById(req.user.id).select("communityPoints");

    if (!me) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const betterUsersCount = await userModel.countDocuments({
      communityPoints: { $gt: me.communityPoints },
    });

    const myRank = betterUsersCount + 1;

    res.json({
      success: true,
      communityLeaderboard,
      stats: {
        rank: myRank,
        communityPoints: me.communityPoints,
      },
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

    const me = await userModel.findById(req.user.id).select("collabPoints");

    if (!me) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const betterUsersCount = await userModel.countDocuments({
      collabPoints: { $gt: me.collabPoints },
    });

    const myRank = betterUsersCount + 1;

    res.status(200).json({
      success: true,
      count: collabLeaderboard.length,
      collabLeaderboard,
      stats: {
        rank: myRank,
        collabPoints: me.collabPoints,
      },
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

      const me = await userModel.findById(req.user.id).select("reputationPoints");

    if (!me) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const betterUsersCount = await userModel.countDocuments({
      reputationPoints: { $gt: me.reputationPoints },
    });

    const myRank = betterUsersCount + 1;

    res.status(200).json({
      success: true,
      count: reputationLeaderboard.length,
      reputationLeaderboard,
       stats: {
        rank: myRank,
        reputationPoints: me.reputationPoints,
      },
    });
  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
