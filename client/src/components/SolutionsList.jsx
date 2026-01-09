// SolutionsList.jsx - Responsive Fix
import {
  CheckCircle,
  Calendar,
  ThumbsUp,
  Code2,
  ThumbsDown,
} from "lucide-react";
import { useSolution } from "../context/solutionContext";

const SolutionsList = ({ solutions, loading }) => {
  const { addReaction } = useSolution();

  if (loading)
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Loading solutions...
        </p>
      </div>
    );

  if (!solutions.length)
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 mb-3 sm:mb-4">
          <Code2 className="text-gray-600" size={20} />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
          No solutions yet
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm max-w-xs sm:max-w-md mx-auto">
          Be the first to submit a solution!
        </p>
      </div>
    );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          Community Solutions
        </h3>
        <span className="text-xs sm:text-sm text-gray-600">
          {solutions.length} submission{solutions.length !== 1 ? "s" : ""}
        </span>
      </div>

      {solutions.map((sol, index) => (
        <div
          key={sol._id}
          className="border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 bg-white hover:border-indigo-200 transition-all duration-300"
        >
          {/* Header - Stack on mobile, row on desktop */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100">
                <span className="text-sm sm:text-base font-semibold text-indigo-700">
                  {sol.userId?.username?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                    {sol.userId?.username || "Anonymous"}
                  </h4>
                  {sol.isAccepted && (
                    <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      <CheckCircle size={10} />
                      <span className="hidden xs:inline">Accepted</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(sol.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {index === 0 && solutions.length > 1 && (
              <span className="self-start sm:self-center inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                <Award size={12} />
                Top Solution
              </span>
            )}
          </div>

          {/* Solution Text */}
          <div className="mb-3 sm:mb-4">
            <p className="text-gray-700 text-sm sm:text-base whitespace-pre-wrap overflow-hidden line-clamp-3 sm:line-clamp-none">
              {sol.description}
            </p>
          </div>

          {/* Footer Actions */}
          {/* Footer Actions */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
            {sol.repoLink && (
              <a
                className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
                href={sol.repoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitBranch size={14} />
                View Repository
              </a>
            )}

            {/* ✅ REACTIONS */}
            <div className="flex items-center gap-3">
              {/* LIKE */}
              <button
                onClick={() => addReaction(sol._id, "like")}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition
        ${
          sol.currentUserReaction === "like"
            ? "bg-green-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-green-100"
        }`}
              >
                <ThumbsUp size={14} />
                {sol.likes}
              </button>

              {/* DISLIKE */}
              <button
                onClick={() => addReaction(sol._id, "dislike")}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition
        ${
          sol.currentUserReaction === "dislike"
            ? "bg-red-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-red-100"
        }`}
              >
                <ThumbsDown size={14} />
                {sol.dislikes}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SolutionsList;
