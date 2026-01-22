import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    type: {
      type: String,
      enum: ["LIKE", "DISLIKE", "TOP", "MESSAGE", "BID_SELECTED"],
      required: true,
    },

    text: String,
    link: String,

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
