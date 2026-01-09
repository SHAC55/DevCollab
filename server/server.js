import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/DBconnection.js";
import authRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";
import solutionRouter from "./routes/solution.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// DB connection setup 
connectDB();

// Middleware setup
const allowedOrigins = ["http://localhost:5173"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes setup
app.get("/", (req, res) => {
  res.send("DevCollab server is running!");
});

// API ENDPOINT
app.use("/api/auth",authRouter);
app.use("/api/problem",problemRouter)
app.use("/api/solution",solutionRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});