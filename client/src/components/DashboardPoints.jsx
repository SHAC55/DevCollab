import React, { useEffect } from "react";
import { useLeaderboard } from "../context/leaderboardContext";

const DashboardPoints = () => {
  const {
    communityStats,
    collabStats,
    reputationStats,
    fetchCommunityLeaderboard,
    fetchCollabLeaderboard,
    fetchReputationLeaderboard,
  } = useLeaderboard();

  const pointsStats = [
    {
      name: "community",
      rank: communityStats?.rank ?? "-",
      points: communityStats?.communityPoints ?? "-",
    },
    {
      name: "collab",
      rank: collabStats?.rank ?? "-",
      points: collabStats?.collabPoints ?? "-",
    },
    {
      name: "reputation",
      rank: reputationStats?.rank ?? "-",
      points: reputationStats?.reputationPoints ?? "-",
    },
  ];

  const cardColors = [
    "bg-red-50 border-red-200",    // community
    "bg-green-50 border-green-200",  // collab
    "bg-yellow-50 border-yellow-200" // reputation
  ];

  const badgeColors = [
    "bg-red-100 text-red-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
  ];

  useEffect(() => {
    fetchCommunityLeaderboard();
    fetchCollabLeaderboard();
    fetchReputationLeaderboard();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {pointsStats.map((item, index) => (
        <div
          key={index}
          className={`rounded-xl p-6 shadow-sm hover:shadow-md transition
          ${cardColors[index]}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase text-gray-500 tracking-wide">
                Category
              </p>
              <h3 className="text-lg font-semibold text-gray-800 capitalize">
                {item.name}
              </h3>
            </div>

            <span
              className={`px-3 py-1 text-sm rounded-full font-semibold
              ${badgeColors[index]}`}
            >
              #{item.rank}
            </span>
          </div>

          {/* Points */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              {typeof item.points === "number"
                ? item.points.toLocaleString()
                : item.points}
            </h2>
            <p className="text-sm text-gray-600 mt-1">Total Points</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPoints;
