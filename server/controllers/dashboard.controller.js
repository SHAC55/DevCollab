import bidsModel from "../models/bidsModel.js";
import problemModel from "../models/problemModel.js";

export const getUserDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // ---------- PROBLEMS (user as owner) ----------
    const totalSolved = await problemModel.countDocuments({
      userId,
      status: "solved",
    });

    const inProgress = await problemModel.countDocuments({
      userId,
      status: "in-progress",
    });

    // ---------- BIDS (user as bidder) ----------
    const activeBids = await bidsModel.countDocuments({
      userId,
      status: "pending",
    });

    const acceptedBids = await bidsModel.countDocuments({
      userId,
      status: "accepted",
    });

    const rejectedBids = await bidsModel.countDocuments({
      userId,
      status: "rejected",
    });

    return res.json({
      totalSolved,
      inProgress,
      activeBids,
      acceptedBids,   // ✅ added
      rejectedBids,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
