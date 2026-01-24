import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { useAuth } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import PostProblem from "./pages/PostProblem";
import Account from "./pages/Account";
import ProblemDetails from "./pages/ProblemDetails";
import SolutionSubmission from "./pages/SolutionSubmission";
import BidSubmission from "./pages/BidSubmission";
import Chat from "./pages/Chat";
import ManageProblems from "./pages/ManageProblems";
import Leaderboard from "./pages/Leaderboard";
import RecentChats from "./pages/RecentChats";
import Notify from "./pages/Notify";
import TermServices from "./pages/TermServices";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const { token, loading } = useAuth();

  // wait until token is checked (important on refresh)
  if (loading) return null; // or loader

  return (
    <>
      <ToastContainer />

      <Routes>
        {/* -------- PUBLIC ROUTES -------- */}

        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <Home />}
        />

        <Route
          path="/sign-in"
          element={token ? <Navigate to="/dashboard" replace /> : <SignIn />}
        />

        <Route
          path="/sign-up"
          element={token ? <Navigate to="/dashboard" replace /> : <SignUp />}
        />

        <Route path="/terms&services" element={<TermServices />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* -------- PROTECTED ROUTES -------- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/post-problem" element={<PostProblem />} />
          <Route path="/account" element={<Account />} />

          <Route path="/problem/:id" element={<ProblemDetails />} />
          <Route path="/problems/:id" element={<ProblemDetails />} />

          <Route
            path="/problems/:id/submit-solution"
            element={<SolutionSubmission />}
          />
          <Route path="/problems/:id/apply-bid" element={<BidSubmission />} />

          <Route path="/chat/:problemId" element={<Chat />} />
          <Route path="/manageproblems" element={<ManageProblems />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/recentchats" element={<RecentChats />} />
          <Route path="/notifications" element={<Notify />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
