import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSolution } from "../context/solutionContext";
import {
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Code2,
  GitBranch,
  CheckCircle,
  Star,
  Clock,
  ChevronDown,
  ChevronUp,
  Trophy,
} from "lucide-react";

const AllSolutions = ({ isOwner, topSolutions = [] }) => {
  const { id } = useParams();

  const {
    solutions,
    loading,
    getSolutionsByProblem,
    addReaction,
    selectTopSolutions,
  } = useSolution();

  const [expanded, setExpanded] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);

  // ids of top solutions from backend
  const topIds = topSolutions.map((s) => s._id);

  useEffect(() => {
    if (id) getSolutionsByProblem(id);
  }, [id]);

  // sync backend top solutions with local state (for owner editing)
  useEffect(() => {
    setSelectedIds(topIds);
  }, [topSolutions]);

  const toggleExpand = (solutionId) => {
    setExpanded((prev) => ({
      ...prev,
      [solutionId]: !prev[solutionId],
    }));
  };

  // ✅ OWNER: select top solutions (max 3) + SAVE TO DB
  const toggleTopSolution = async (solutionId) => {
    let updated;

    if (selectedIds.includes(solutionId)) {
      updated = selectedIds.filter((id) => id !== solutionId);
    } else {
      if (selectedIds.length >= 3) {
        return alert("You can select maximum 3 top solutions");
      }
      updated = [...selectedIds, solutionId];
    }

    setSelectedIds(updated);
    await selectTopSolutions(id, updated); // ✅ save to DB
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-indigo-500 border-t-transparent mb-4"></div>
        <p className="text-gray-600 font-medium">Loading solutions...</p>
      </div>
    );
  }

  if (!solutions.length) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border">
        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Code2 className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No solutions yet</h3>
        <p className="text-gray-600 mb-4">
          Be the first to submit a solution.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-lg">
          <Star className="w-4 h-4 text-indigo-500" />
          <span className="text-sm text-indigo-700 font-medium">
            Earn reputation points
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {solutions.map((sol) => {
        const isExpanded = expanded[sol._id];
        const isTop = topIds.includes(sol._id);

        return (
          <div
            key={sol._id}
            className={`bg-white rounded-xl border transition ${
              isTop
                ? "border-emerald-400 shadow-md"
                : "hover:border-indigo-300 hover:shadow-md"
            }`}
          >
            <div className="p-6">
              {/* HEADER */}
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center font-bold text-indigo-700">
                      {sol.userId?.username?.[0]?.toUpperCase() || "U"}
                    </div>

                    {isTop && (
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">
                        @{sol.userId?.username || "Anonymous"}
                      </h4>

                      {sol.isAccepted && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Accepted
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(sol.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {new Date(sol.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {isTop && (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">
                    Top Selected
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <p
                className={`text-gray-700 mb-2 whitespace-pre-wrap transition-all ${
                  isExpanded ? "" : "line-clamp-2"
                }`}
              >
                {sol.description}
              </p>

              {sol.description.length > 120 && (
                <button
                  onClick={() => toggleExpand(sol._id)}
                  className="flex items-center gap-1 text-indigo-600 text-sm font-medium hover:underline mb-4"
                >
                  {isExpanded ? (
                    <>
                      Show less <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      Read full solution <ChevronDown size={14} />
                    </>
                  )}
                </button>
              )}

              {/* ACTIONS */}
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => addReaction(sol._id, "like")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                      sol.currentUserReaction === "like"
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <ThumbsUp size={14} />
                    {sol.likes || 0}
                  </button>

                  <button
                    onClick={() => addReaction(sol._id, "dislike")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                      sol.currentUserReaction === "dislike"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <ThumbsDown size={14} />
                    {sol.dislikes || 0}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {sol.repoLink && (
                    <a
                      href={sol.repoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-indigo-600 text-sm"
                    >
                      <GitBranch size={14} />
                      Repo
                    </a>
                  )}

                  {/* OWNER SELECT BUTTON */}
                  {isOwner && (
                    <button
                      onClick={() => toggleTopSolution(sol._id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                        selectedIds.includes(sol._id)
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {selectedIds.includes(sol._id) ? "Selected" : "Select Top"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllSolutions;
