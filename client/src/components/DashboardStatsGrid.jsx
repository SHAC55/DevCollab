import React, { useEffect } from "react";
import {
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  TrendingUp,
  TrendingDown,
  BadgeCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDash } from "../context/dashContext";

const DashboardStatsGrid = () => {
  const navigate = useNavigate();
  const { stats, fetchDashboardStats, loading } = useDash();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading || !stats) {
    return <div className="mb-8 text-gray-600">Loading stats...</div>;
  }

  const cards = [
    {
      title: "Total Problems Solved",
      value: stats.totalSolved,
      icon: CheckCircle,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Bids",
      value: stats.activeBids,
      icon: DollarSign,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Accepted Bids", 
      value: stats.acceptedBids, 
      icon: BadgeCheck,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      title: "Rejected Bids",
      value: stats.rejectedBids,
      icon: FileText,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      // route: "/mybids",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((stat, index) => (
        <div
          key={index}
          onClick={() => stat.route && navigate(stat.route)}
          className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${stat.bgColor} rounded-xl`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600">{stat.title}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStatsGrid;
