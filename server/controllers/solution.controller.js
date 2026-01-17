import problemModel from "../models/problemModel.js";
import solutionModel from "../models/solutionModel.js";
import userModel from "../models/userModel.js";

export const submitSolution = async (req, res) => {
  try {
    const { description, repoLink } = req.body;
    const userId = req.user.id;
    const { problemId } = req.params;

    if (!description || description.length < 20) {
      return res.status(400).json({
        message: "Description must be at least 20 characters long.",
      });
    }

    const problem = await problemModel.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found." });
    }

    const alreadySubmitted = await solutionModel.findOne({
      userId: userId,
      problemId: problemId,
    });

    if (alreadySubmitted) {
      return res.status(400).json({
        message: "You have already submitted a solution for this problem.",
      });
    }

    const newSolution = new solutionModel({
      problemId: problemId,
      userId: userId,
      description,
      repoLink,
    });

    await newSolution.save();

    problem.solutionsCount += 1;
    await problem.save();

    res.status(201).json({
      success: true,
      message: "Solution submitted successfully",
      newSolution,
    });
  } catch (error) {
    console.error("Error submitting solution:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSolutionsByProblem = async (req, res) => {
  try {
    const { problemId } = req.params;

    const solutions = await solutionModel
      .find({ problemId: problemId })
      .populate("userId", "username email");

    res.status(200).json({ success: true, solutions });
  } catch (error) {
    console.error("Error fetching solutions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reactionToSolution = async (req, res) => {
  try {
    const { solutionId } = req.params;
    const { type } = req.body;
    const userId = req.user._id || req.user.id;

    if (!["like", "dislike"].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid reaction type" });
    }

    const solution = await solutionModel.findById(solutionId);
    if (!solution) {
      return res.status(404).json({ success: false, message: "Solution not found" });
    }

    const solutionOwner = await userModel.findById(solution.userId);
    if (!solutionOwner) {
      return res.status(404).json({ success: false, message: "Solution owner not found" });
    }

    const existingReactionIndex = solution.reactions.findIndex(
      (r) => r.userId.toString() === userId.toString()
    );

    // CASE 1: New reaction
    if (existingReactionIndex === -1) {
      solution.reactions.push({ userId, type });

      if (type === "like") {
        solution.likes += 1;
        solutionOwner.communityPoints += 1;
      } else {
        solution.dislikes += 1;
      }
    }

    else {
      const existingReaction = solution.reactions[existingReactionIndex];

      // CASE 2: Toggle off
      if (existingReaction.type === type) {
        solution.reactions.splice(existingReactionIndex, 1);

        if (type === "like") {
          solution.likes -= 1;
          solutionOwner.communityPoints -= 1;
        } else {
          solution.dislikes -= 1;
        }
      }

      // CASE 3: Switch
      else {
        if (existingReaction.type === "like" && type === "dislike") {
          solution.likes -= 1;
          solution.dislikes += 1;
          solutionOwner.communityPoints -= 1;
        }

        if (existingReaction.type === "dislike" && type === "like") {
          solution.dislikes -= 1;
          solution.likes += 1;
          solutionOwner.communityPoints += 1;
        }

        existingReaction.type = type;
      }
    }

    await Promise.all([solution.save(), solutionOwner.save()]);

    const currentReaction = solution.reactions.find(
      (r) => r.userId.toString() === userId.toString()
    );

    res.status(200).json({
      success: true,
      likes: solution.likes,
      dislikes: solution.dislikes,
      currentUserReaction: currentReaction ? currentReaction.type : null,
    });

  } catch (error) {
    console.error("Error reacting to solution:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

