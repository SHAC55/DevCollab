import problemModel from "../models/problemModel.js";
import userModel from "../models/userModel.js";

export const postProblem = async (req, res) => {
  try {
    const { title, description, repoLink, tags, type, bounty } = req.body;

    const userId = req.user?.id;

    if (
      !title ||
      !description ||
      !type ||
      !Array.isArray(tags) ||
      tags.length === 0 ||
      (type === "paid" && !bounty)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const newProblem = await problemModel.create({
      userId,
      title: title.trim(),
      description: description.trim(),
      repoLink: repoLink?.trim(),
      tags,
      type,
      bounty: type === "paid" ? bounty : undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Problem posted successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.error("Error posting problem:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all active problems
export const getActiveProblems = async (req, res) => {
  try {
    const problems = await problemModel
      .find({ status: { $in: ["open", "in-progress"] } })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: problems.length,
      problems,
    });
  } catch (error) {
    console.error("Error getting problems:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Problem By ID
export const getProblemById = async (req, res) => {
  try {
    const problemId = req.params.id;
    const problem = await problemModel
      .findById(problemId)
      .populate("userId", "username email")
      .populate("topSolutions");

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }
    res.status(200).json({
      success: true,
      problem,
    });
  } catch (error) {
    console.error("Error getting problem by ID:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Single User All problems
export const getUserAllProblems = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    const problems = await problemModel
      .find({ userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: problems.length,
      problems,
    });
  } catch (error) {
    console.error("Error getting user problems:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// mark as solved
export const markSolved = async (req, res) => {
  try {
    const { problemId } = req.params;

    const ownerId = req.user.id;

    const { qualityRating, deliveryOnTime } = req.body;

    const problem = await problemModel
      .findById(problemId)
      .populate("selectedBidder")
      .populate({
        path: "topSolutions",
        populate: { path: "userId", select: "_id" },
      });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    //  Only owner can mark solved
    if (problem.userId.toString() !== ownerId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    let solverId;

    /* ================= PAID PROBLEM ================= */
    if (problem.type === "paid") {
      if (!qualityRating || !deliveryOnTime) {
        return res.status(400).json({
          success: false,
          message:
            "Quality and delivery ratings are required for paid problems",
        });
      }

      if (!problem.selectedBidder) {
        return res.status(400).json({
          success: false,
          message: "No bidder selected for this paid problem",
        });
      }

      solverId = problem.selectedBidder._id;

      // save evaluation
      problem.evaluation = {
        qualityRating,
        deliveryOnTime,
      };

      const reputationPoints = Number(qualityRating) + Number(deliveryOnTime);

      await userModel.findByIdAndUpdate(solverId, {
        $inc: {
          reputationPoints,
          collabPoints: 10,
        },
      });
    } else {

    /* ================= FREE PROBLEM ================= */
      if (!problem.topSolutions || problem.topSolutions.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No top solution selected for this free problem",
        });
      }

      // top selected solution author
      solverId = problem.topSolutions[0].userId._id;

      await userModel.findByIdAndUpdate(solverId, {
        $inc: {
          communityPoints: 10,
        },
      });
    }

    // Mark problem solved
    problem.status = "solved";
    await problem.save();

    return res.json({
      success: true,
      message:
        problem.type === "paid"
          ? "Paid problem solved and reputation updated"
          : "Free problem solved and community points awarded",
    });
  } catch (error) {
    console.error("Mark solved error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// mark as failed 
export const markFailed = async (req, res) => {
  try {
    const { problemId } = req.params;
    const ownerId = req.user.id;

    const problem = await problemModel
      .findById(problemId)
      .populate("selectedBidder");

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // only owner can mark failed
    if (problem.userId.toString() !== ownerId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // only for paid problems
    if (problem.type !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Only paid problems can be marked as failed",
      });
    }

    if (!problem.selectedBidder) {
      return res.status(400).json({
        success: false,
        message: "No bidder selected for this problem",
      });
    }

    // penalize solver
    const solverId = problem.selectedBidder._id;

    await userModel.findByIdAndUpdate(solverId, {
      $inc: {
        reputationPoints: -15, // penalty 
      },
    });

    // mark failed
    problem.status = "failed";
    await problem.save();

    return res.json({
      success: true,
      message: "Paid problem marked as failed",
    });
  } catch (error) {
    console.error("Mark failed error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

