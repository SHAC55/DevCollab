import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Chat", chatSchema);
