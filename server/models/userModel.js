import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.oauthProvider; // password only for normal signup
      },
    },

    profession: {
      type: String,
      enum: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile Developer",
        "DevOps Engineer",
        "UI/UX Designer",
        "Student",
        "Freelancer",
      ],
    },

    github: {
      type: String,
    },

    linkedin: {
      type: String,
    },

    // 🔐 OAuth fields
    oauthProvider: {
      type: String,
      enum: ["google", "github"],
    },

    oauthId: {
      type: String,
    },

    avatar: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
