import mongoose from "mongoose";

// Why We Create a Small Schema Inside Another Schema?
// This is called Embedded (Sub) Schema.

const reactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  { _id: false }, // no separate id needed for each reaction
);

const solutionSchema = new mongoose.Schema(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, required: true, minlength: 20 },
    repoLink: { type: String, trim: true },

    // reactions
    reactions: {
      type: [reactionSchema],
      default: [],
    },

    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Solution", solutionSchema);
