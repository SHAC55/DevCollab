import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../components/DashboardHeader";
import DashboardStatsGrid from "../components/DashboardStatsGrid";
import DashboardPoints from "../components/DashboardPoints";
import QuickActions from "../components/QuickActions";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_40%),linear-gradient(120deg,#f3ecff,#eef3ff,#ffffff)] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <DashboardHeader />

        {/* Stats Grid */}
        <DashboardStatsGrid />

        {/* Points / Leaderboard Cards */}
        <DashboardPoints />

        {/* Quick Actions (Full Width) */}
        <div className="mt-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
