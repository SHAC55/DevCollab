import React from "react";
import {
  FileText,
  DollarSign,
  MessageSquare,
  BarChart3,
  ClipboardList,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Post New Problem",
      icon: FileText,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      route: "/post-problem",
    },
    {
      title: "Manage Problems",
      icon: ClipboardList,
      color: "bg-indigo-100",
      iconColor: "text-indigo-600",
      route: "/manageproblems",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      color: "bg-emerald-100",
      iconColor: "text-emerald-600",
      route: "/recentchats",
    },
    // {
    //   title: "Leaderboard",
    //   icon: BarChart3,
    //   color: "bg-amber-100",
    //   iconColor: "text-amber-600",
    //   route: "/leaderboard",
    // },
    {
      title: "Manage Account",
      icon: User,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      route: "/account",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.route)}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200
                       hover:border-purple-300 hover:bg-purple-50 transition-all group"
          >
            <div
              className={`p-3 ${action.color} rounded-lg mb-3 group-hover:scale-110 transition-transform`}
            >
              <action.icon className={`w-6 h-6 ${action.iconColor}`} />
            </div>

            <span className="text-sm font-medium text-gray-900 text-center">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
