import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    proposal: {
      type: String,
      minlength: 20,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    link: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// one user can bid only once per problem
bidSchema.index({ userId: 1, problemId: 1 }, { unique: true });

export default mongoose.model("Bid", bidSchema);
