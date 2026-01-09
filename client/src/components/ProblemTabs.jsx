// ProblemTabs.jsx - Responsive Fix
import { MessageSquare, FileText, Code2 } from "lucide-react";
import SolutionsList from "./SolutionsList";

const ProblemTabs = ({ problem, activeTab, setActiveTab, solutions, solutionLoading }) => {
  const tabs = [
    { key: "description", label: "Description", icon: FileText, shortLabel: "Desc" },
    { key: "solutions", label: `Solutions`, icon: Code2, shortLabel: `Sols` },
    { key: "discussion", label: "Discussion", icon: MessageSquare, shortLabel: "Chat" },
  ];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg border border-gray-200 overflow-hidden">
      {/* Tabs Navigation - Mobile optimized */}
      <div className="flex border-b border-gray-200 px-2 sm:px-6">
        {tabs.map(({ key, label, icon: Icon, shortLabel }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 sm:flex-none flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-all ${
              activeTab === key
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon size={18} className="sm:size-[20px]" />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{shortLabel}</span>
            {solutions.length > 0 && key === 'solutions' && (
              <span className="absolute -top-1 -right-1 sm:static sm:ml-1 bg-indigo-100 text-indigo-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {solutions.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 md:p-8">
        {activeTab === "description" && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {problem.title}
              </h1>
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                {problem.techStack?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm border border-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
              <pre className="text-gray-700 whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed overflow-x-auto">
                {problem.description}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "solutions" && (
          <SolutionsList solutions={solutions} loading={solutionLoading} />
        )}

        {activeTab === "discussion" && (
          <div className="text-center py-8 sm:py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-100 mb-4">
              <MessageSquare className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Discussion Coming Soon
            </h3>
            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
              Community discussions feature is under development.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemTabs;