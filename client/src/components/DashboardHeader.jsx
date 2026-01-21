import React from "react";
import { useAuth } from "../context/authContext";

const DashboardHeader = () => {
  const { user } = useAuth();
//   console.log(user)
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.username} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your projects today.
        </p>
      </div>
      <div className="flex items-center gap-3"></div>
    </div>
  );
};

export default DashboardHeader;
