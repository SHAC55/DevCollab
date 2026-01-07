import problemModel from "../models/problemModel.js";

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
export const getActiveProblems  = async(req,res) => {
  try {
    
    const  problems  =await problemModel.find({ status:"open"})
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
}

// Problem By ID
export const getProblemById = async(req,res) => {
  try {
    const problemId = req.params.id;
    const  problem =  await problemModel.findById(problemId).populate("userId", "username email");

    if(!problem){
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
}  

// Single User All problems
export const getUserAllProblems =  async(req,res) => {
  try {
    const userId  =  req.user?.id;

    if(!userId){
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    const problems = await problemModel.find({ userId })
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
}

// 