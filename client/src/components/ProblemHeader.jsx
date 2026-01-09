// ProblemHeader.jsx - Responsive with Posted By Info
import {
  ArrowLeft,
  Calendar,
  Lock,
  Unlock,
  DollarSign,
  User,
  Eye,
} from "lucide-react";

const ProblemHeader = ({ problem, isFree, isOwner, onBack }) => {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "in progress":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "resolved":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95 supports-[backdrop-filter]:bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Back Button - Mobile optimized */}
          <button
            onClick={onBack}
            className="group flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-indigo-600 transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-50 active:scale-95 transition-transform"
          >
            <ArrowLeft size={16} className="sm:size-[18px]" />
            <span className="hidden xs:inline font-medium text-sm sm:text-base">
              Back
            </span>
            <span className="xs:hidden font-medium text-sm">Back</span>
          </button>

          {/* Posted By Info - Mobile & Desktop */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Posted By - Hidden on very small screens, shows on xs+ */}
            {/* Posted By Info */}
            <div className="flex flex-col items-end sm:items-start sm:flex-row sm:gap-4 text-xs sm:text-sm text-gray-600">
              {/* Posted By */}
              <div className="flex items-center gap-1.5">
                <User size={12} className="sm:size-[14px]" />
                <span>Posted by</span>
                <span className="font-semibold text-gray-900">
                  {problem.userId?.username || "Anonymous"}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="sm:size-[14px]" />
                <span>{formatDate(problem.createdAt)}</span>
              </div>

              {/* Solutions Count (hide on very small screens) */}
              <div className="hidden sm:flex items-center gap-1.5">
                <Eye size={12} className="sm:size-[14px]" />
                <span>{problem.solutionsCount || 0} solutions</span>
              </div>
            </div>

            {/* Status & Type Badges */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Status Badge */}
              <div
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(
                  problem.status
                )}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    problem.status === "open"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />
                <span className="hidden xs:inline">
                  {problem.status || "Open"}
                </span>
                <span className="xs:hidden">{problem.status?.[0] || "O"}</span>
              </div>

              {/* Free/Premium Badge */}
              <div
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${
                  isFree
                    ? "bg-sky-50 text-sky-700 border-sky-200"
                    : "bg-violet-50 text-violet-700 border-violet-200"
                }`}
              >
                {isFree ? (
                  <Unlock size={12} className="sm:size-[14px] opacity-80" />
                ) : (
                  <Lock size={12} className="sm:size-[14px] opacity-80" />
                )}
                <span className="hidden sm:inline">
                  {isFree ? "Free" : "Premium"}
                </span>
                {!isFree && <DollarSign size={10} className="sm:size-[12px]" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemHeader;
