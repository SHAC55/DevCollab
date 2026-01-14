import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      minlength: 20,
    },

    repoLink: {
      type: String,
      trim: true,
    },

    tags: {
      type: [String],
      validate: [arr => arr.length <= 5, "Maximum 5 tags allowed"],
    },

    type: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },

    bounty: {
      type: Number,
      min: 100,
      required: function () {
        return this.type === "paid";
      },
    },

    bids:{
      type:Number,
      default:0,
    },

    status: {
      type: String,
      enum: ["open", "in-progress","solved"],
      default: "open",
    },

    solutionsCount: {
      type: Number,
      default: 0,
    },

    selectedSolution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Solution",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Problem", problemSchema);
