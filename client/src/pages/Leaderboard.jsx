import { useEffect, useState } from "react";
import { useLeaderboard } from "../context/leaderboardContext";
import { 
  Trophy, 
  Users, 
  Handshake, 
  Star, 
  ChevronUp,
  Medal,
  Sparkles,
  TrendingUp
} from "lucide-react";

const Leaderboard = () => {
  const {
    community,
    collab,
    reputation,
    loading,
    fetchCommunityLeaderboard,
    fetchCollabLeaderboard,
    fetchReputationLeaderboard,
  } = useLeaderboard();

  const [tab, setTab] = useState("community");

  useEffect(() => {
    fetchCommunityLeaderboard();
  }, []);

  useEffect(() => {
    if (tab === "community") fetchCommunityLeaderboard();
    if (tab === "collab") fetchCollabLeaderboard();
    if (tab === "reputation") fetchReputationLeaderboard();
  }, [tab]);

  const data =
    tab === "community"
      ? community
      : tab === "collab"
      ? collab
      : reputation;

  // Medal colors for top 3 positions
  const getMedalColor = (index) => {
    switch(index) {
      case 0: return "text-yellow-500";
      case 1: return "text-gray-400";
      case 2: return "text-amber-700";
      default: return "text-slate-400";
    }
  };

  const getRankIcon = (index) => {
    switch(index) {
      case 0: return <Medal className="w-5 h-5 text-yellow-500" />;
      case 1: return <Medal className="w-5 h-5 text-gray-400" />;
      case 2: return <Medal className="w-5 h-5 text-amber-700" />;
      default: return <span className="text-slate-600 font-medium">{index + 1}</span>;
    }
  };

  const getTabIcon = (tabName) => {
    switch(tabName) {
      case "community": return <Users className="w-4 h-4" />;
      case "collab": return <Handshake className="w-4 h-4" />;
      case "reputation": return <Star className="w-4 h-4" />;
      default: return null;
    }
  };

  const getPointsLabel = () => {
    switch(tab) {
      case "community": return "Community Points";
      case "collab": return "Collaboration Points";
      case "reputation": return "Reputation Points";
      default: return "Points";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Leaderboard
            </h1>
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Celebrating excellence and achievement across our platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {community?.length || 0}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Community Leaders</h3>
            <p className="text-sm text-gray-500">Active contributors making a difference</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <Handshake className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">
                {collab?.length || 0}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Collaborators</h3>
            <p className="text-sm text-gray-500">Top team players and partners</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">
                {reputation?.length || 0}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Reputation Stars</h3>
            <p className="text-sm text-gray-500">Most respected members</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-4 border-b border-gray-100">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-xl font-bold text-gray-800">Top Performers</h2>
              <p className="text-sm text-gray-500 mt-1">{getPointsLabel()}</p>
            </div>
            
            <div className="flex gap-2 bg-gray-50 p-1 rounded-xl">
              {[
                { id: "community", label: "Community", icon: <Users className="w-4 h-4" /> },
                { id: "collab", label: "Collaboration", icon: <Handshake className="w-4 h-4" /> },
                { id: "reputation", label: "Reputation", icon: <Star className="w-4 h-4" /> }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                    ${tab === t.id
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }
                  `}
                >
                  {t.icon}
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Leaderboard Table */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
                <p className="text-gray-600">Loading leaderboard data...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                  <tr>
                    <th className="p-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      User
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Profession
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Points
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(data || []).slice(0, 20).map((u, i) => (
                    <tr
                      key={u._id}
                      className={`
                        hover:bg-gray-50 transition-colors duration-200
                        ${i < 3 ? "bg-gradient-to-r from-blue-50/50 to-white" : ""}
                      `}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`font-bold ${getMedalColor(i)}`}>
                            {getRankIcon(i)}
                          </div>
                          {i < 3 && (
                            <Sparkles className={`w-4 h-4 ${getMedalColor(i)}`} />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {u.username?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {u.username}
                            </div>
                            <div className="text-sm text-gray-500">
                              Level {Math.floor((u[`${tab}Points`] || 0) / 100) + 1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                          <span className="text-sm font-medium text-gray-700">
                            {u.profession || "Professional"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-bold text-gray-900">
                            {tab === "community"
                              ? u.communityPoints
                              : tab === "collab"
                              ? u.collabPoints
                              : u.reputationPoints}
                          </div>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-700">
                            {i < 3 ? "Top Performer" : "Active"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing top {(data || []).length > 20 ? 20 : (data || []).length} of {(data || []).length} entries
              </div>
              <div className="flex items-center gap-4">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View Full Leaderboard →
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ChevronUp className="w-4 h-4" />
                  <span>Updated in real-time</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 text-sm">
            <Medal className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700">1st Place</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Medal className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">2nd Place</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Medal className="w-5 h-5 text-amber-700" />
            <span className="text-gray-700">3rd Place</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;