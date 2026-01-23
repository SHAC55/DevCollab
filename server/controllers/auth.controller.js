import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, profession, github, linkedin } =
      req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Filled required fields" });
    }

    const exsistingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (exsistingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,

      profession,
      github,
      linkedin,
    });

    const token = generateToken(newUser._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    return res
      .status(200)
      .json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    // security: don't reveal if user exists or not
    if (!user) {
      return res.status(200).json({ msg: "Reset link sent to email" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `You requested a password reset.\n\nClick here:\n${resetUrl}\n\nThis link is valid for 10 minutes.`;

    await sendEmail(user.email, "Password Reset", message);

    res.status(200).json({ msg: "Reset link sent to email" });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};



export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    // will be hashed by pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
