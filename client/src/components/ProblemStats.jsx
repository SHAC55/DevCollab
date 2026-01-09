// ProblemStats.jsx - Responsive Fix
import { Clock, Users, Award, Target, BarChart3 } from "lucide-react";

const ProblemStats = ({ problem }) => {
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  });

  const stats = [
    {
      icon: Target,
      label: "Status",
      value: problem.status,
      color: "text-emerald-600",
    },
    {
      icon: Users,
      label: "Solvers",
      value: problem.activeSolvers || "12",
      color: "text-indigo-600",
    },
    {
      icon: Award,
      label: "Solutions",
      value: problem.solutionsCount || "0",
      color: "text-violet-600",
    },
    {
      icon: Clock,
      label: "Created",
      value: formatDate(problem.createdAt),
      color: "text-gray-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="p-2 rounded-lg bg-gray-100">
          <BarChart3 className="text-gray-700" size={18} />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          Statistics
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-gray-50 rounded-lg p-3 sm:p-4"
          >
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <div className={`p-1.5 rounded ${stat.color.replace('text', 'bg') + '20'}`}>
                <stat.icon size={14} className={`${stat.color}`} />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</span>
            </div>
            <span className={`text-base sm:text-lg font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
      
      {/* Additional info - Stack on mobile */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 space-y-2 sm:space-y-3">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
          <span className="text-xs sm:text-sm text-gray-600">Difficulty</span>
          <span className="px-2 sm:px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm font-medium">
            {problem.difficulty || 'Intermediate'}
          </span>
        </div>
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
          <span className="text-xs sm:text-sm text-gray-600">Time Estimate</span>
          <span className="font-medium text-gray-900 text-sm sm:text-base">{problem.estimate || '2-4 hours'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProblemStats;