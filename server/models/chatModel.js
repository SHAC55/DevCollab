import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    roomId: String,
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderName: String,
    // receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
  },
  { timestamps: true }
);


export default mongoose.model("Chat", chatSchema);
