import React from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

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


const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/post-problem" element={<PostProblem />} />
        <Route path="/account" element={<Account />} />
        <Route path="/problem/:id" element={<ProblemDetails />} />
        <Route path="/problems/:id" element={<ProblemDetails />} />
        <Route path="/problems/:id/submit-solution" element={<SolutionSubmission/>} />
        <Route path="/problems/:id/apply-bid" element={<BidSubmission/>} />
        <Route path="/chat/:problemId" element={<Chat />} />
        <Route path="/manageproblems" element={<ManageProblems/>}  />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/recentchats" element={<RecentChats/>} />
      </Routes>
    </>
  );
};

export default App;
