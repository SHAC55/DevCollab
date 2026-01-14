import e from "express";
import bidsModel from "../models/bidsModel.js";
import problemModel from "../models/problemModel.js";
import chatModel from "../models/chatModel.js";

// apply for bids
export const applyForBid = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { problemId } = req.params;

    const { proposal, amount, link } = req.body;

    if (!proposal || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "Proposal and amount are required" });
    }

    //  Check problem exists
    const problem = await problemModel.findById(problemId);
    if (!problem) {
      return res
        .status(404)
        .json({ success: false, message: "Problem not found" });
    }

    // Check problem is open
    if (problem.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "Bidding is closed for this problem",
      });
    }

    // Prevent duplicate bid by same user
    const existingBid = await bidsModel.findOne({ userId, problemId });
    if (existingBid) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this problem",
      });
    }

    //  Create bid
    const newBid = await bidsModel.create({
      userId,
      problemId,
      proposal,
      link,
      amount,
      status: "pending",
    });

    await problemModel.findByIdAndUpdate(problemId, {
      $inc: { bids: 1 },
    });

    return res.status(201).json({
      success: true,
      message: "Bid applied successfully",
      newBid,
    });
  } catch (error) {
    console.error("Apply bid error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while applying for bid",
    });
  }
};

// all bids by problem
export const getAllBidsByProblem = async (req, res) => {
  try {
    const { problemId } = req.params;

    //  Check problem exists
    const problem = await problemModel.findById(problemId);
    if (!problem) {
      return res
        .status(404)
        .json({ success: false, message: "Problem not found" });
    }

    // Get all bids for this problem
    const allBids = await bidsModel
      .find({ problemId })
      .populate("userId", "username email") // optional but useful
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: allBids.length,
      allBids,
    });
  } catch (error) {
    console.error("Get bids error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// select bid for owner of problem only
export const selectBidByProblem = async (req, res) => {
  try {
    const problemAdminId = req.user.id;
    const { problemId, bidId } = req.params;

    const problem = await problemModel.findById(problemId);
    if (!problem) {
      return res
        .status(404)
        .json({ success: false, message: "Problem not found" });
    }

    // Only problem owner can select bid
    if (problem.userId.toString() !== problemAdminId) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    // Check bid exists and belongs to this problem
    const bid = await bidsModel.findOne({ _id: bidId, problemId });
    if (!bid) {
      return res
        .status(404)
        .json({ success: false, message: "Bid not found for this problem" });
    }

    // Update all bids to rejected
    await bidsModel.updateMany({ problemId }, { $set: { status: "rejected" } });

    //  Accept selected bid
    bid.status = "accepted";
    await bid.save();

    //  Mark problem as solved
    problem.status = "in-progress";
    await problem.save();

    return res.status(200).json({
      success: true,
      message: "Bid selected successfully",
      acceptedBid: bid,
    });
  } catch (error) {
    console.error("Select bid error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
export const getMessages = async (req, res) => {
  const messages = await chatModel
    .find({ roomId: req.params.roomId })
    .sort({ createdAt: 1 });

  res.json(messages);
};
