import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useProblem } from "../context/problemContext";
import {
  PlusCircle,
  Search,
  Loader2,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Users,
  MessageSquare,
  Calendar,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageProblems = () => {
  const {
    myProblems,
    getAllUserProblems,
    loading,
    updateProblemStatus,
    markSolved,
    markFailed,
  } = useProblem();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeMenu, setActiveMenu] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    solved: 0,
  });

  useEffect(() => {
    getAllUserProblems();
  }, []);

  useEffect(() => {
    if (myProblems) {
      setStats({
        total: myProblems.length,
        open: myProblems.filter((p) => p.status === "open").length,
        inProgress: myProblems.filter((p) => p.status === "in-progress").length,
        solved: myProblems.filter((p) => p.status === "solved").length,
      });
    }
  }, [myProblems]);

  const handleMarkSolved = async (e, problem) => {
    e.stopPropagation();

    try {
      if (problem.type === "paid") {
        const qualityRating = prompt("Rate solution quality (1–5):");
        const deliveryOnTime = prompt("Rate delivery (1–5):");

        if (!qualityRating || !deliveryOnTime) return;

        await markSolved(problem._id, {
          qualityRating: Number(qualityRating),
          deliveryOnTime: Number(deliveryOnTime),
        });
      } else {
        // FREE problem
        if (
          !window.confirm(
            "Mark this problem as solved and reward top solution?",
          )
        )
          return;

        await markSolved(problem._id);
      }

      await getAllUserProblems(); // refresh list
    } catch (err) {
      console.error("Solve failed:", err);
      alert("Failed to mark solved");
    }
  };

  const handleMarkFailed = async (e, problem) => {
    e.stopPropagation();

    if (problem.type !== "paid") {
      alert("Only paid problems can be marked as failed");
      return;
    }

    if (
      !window.confirm(
        "Mark this paid problem as FAILED? Reputation will be deducted.",
      )
    )
      return;

    try {
      await markFailed(problem._id);
      await getAllUserProblems();
    } catch (err) {
      console.error("Fail mark error:", err);
      alert("Failed to mark problem as failed");
    }
  };

  // ---------------- FILTER ----------------
  const filteredProblems = myProblems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || problem.status === statusFilter;

    const matchesType = typeFilter === "all" || problem.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // ---------------- STATUS CONFIG ----------------
  const statusConfig = {
    open: {
      label: "Open",
      icon: AlertTriangle,
      color: "bg-red-50 text-red-700",
      dot: "bg-red-500",
      border: "border-red-100",
      gradient: "from-red-500 to-orange-500",
      light: "bg-red-500/10",
    },
    "in-progress": {
      label: "In Progress",
      icon: Clock,
      color: "bg-blue-50 text-blue-700",
      dot: "bg-blue-500",
      border: "border-blue-100",
      gradient: "from-blue-500 to-cyan-500",
      light: "bg-blue-500/10",
    },
    solved: {
      label: "Solved",
      icon: CheckCircle,
      color: "bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
      border: "border-emerald-100",
      gradient: "from-emerald-500 to-green-500",
      light: "bg-emerald-500/10",
    },
    all: {
      label: "All Problems",
      icon: FileText,
      color: "bg-gray-50 text-gray-700",
      dot: "bg-gray-500",
      border: "border-gray-100",
      gradient: "from-gray-500 to-gray-700",
      light: "bg-gray-500/10",
    },
    failed: {
      label: "Failed",
      icon: AlertTriangle,
      color: "bg-red-50 text-red-700",
      dot: "bg-red-500",
      border: "border-red-100",
      gradient: "from-red-500 to-red-700",
      light: "bg-red-500/10",
    },
  };

  const typeConfig = {
    technical: {
      label: "Technical",
      icon: BarChart3,
      color: "bg-purple-100 text-purple-800",
      border: "border-purple-200",
    },
    billing: {
      label: "Billing",
      icon: FileText,
      color: "bg-pink-100 text-pink-800",
      border: "border-pink-200",
    },
    support: {
      label: "Support",
      icon: Users,
      color: "bg-cyan-100 text-cyan-800",
      border: "border-cyan-200",
    },
    feature: {
      label: "Feature",
      icon: MessageSquare,
      color: "bg-amber-100 text-amber-800",
      border: "border-amber-200",
    },
  };

  const getStatusCount = (status) =>
    myProblems.filter((p) => (status === "all" ? true : p.status === status))
      .length;

  // const toggleMenu = (problemId, e) => {
  //   e.stopPropagation();
  //   setActiveMenu(activeMenu === problemId ? null : problemId);
  // };

  // const handleDelete = (problemId) => {
  //   if (window.confirm("Are you sure you want to delete this problem?")) {
  //     console.log("Delete:", problemId);
  //   }
  // };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ---------------- UI ----------------
  return (
    <div className="bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_40%),linear-gradient(120deg,#f3ecff,#eef3ff,#ffffff)] min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Problem Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and track all your submitted problems
              </p>
            </div>
            <button
              onClick={() => navigate("/problems/new")}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <PlusCircle size={20} />
              Submit New Problem
            </button>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {["all", "open", "in-progress", "solved"].map((status) => {
              const cfg = statusConfig[status];
              const Icon = cfg.icon;
              const count = getStatusCount(status);

              return (
                <div
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all duration-300 hover:shadow-lg group ${
                    statusFilter === status
                      ? `border-blue-500 shadow-lg scale-[1.02]`
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-lg ${cfg.light}`}>
                      <Icon
                        className={
                          cfg.color.replace("bg-", "text-").split(" ")[0]
                        }
                        size={22}
                      />
                    </div>
                    <div
                      className={`text-xs font-medium px-3 py-1 rounded-full ${cfg.color} ${cfg.border}`}
                    >
                      {cfg.label}
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">
                        {count}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Total Problems
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                      View all →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTENT WRAPPER */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* TOOLBAR */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Search problems by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="relative px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all w-full lg:w-auto"
                  >
                    <option value="all">All Types</option>
                    {Object.entries(typeConfig).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setTypeFilter("all");
                  }}
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200"
                >
                  Clear Filters
                </button>
              </div> */}
            </div>

            {/* ACTIVE FILTERS */}
            <div className="flex items-center gap-2 mt-4">
              {(statusFilter !== "all" ||
                typeFilter !== "all" ||
                searchTerm) && (
                <>
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {statusFilter !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                      Status: {statusConfig[statusFilter].label}
                      <button
                        onClick={() => setStatusFilter("all")}
                        className="ml-1 text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {typeFilter !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-purple-50 text-purple-700 rounded-full border border-purple-100">
                      Type: {typeConfig[typeFilter]?.label || typeFilter}
                      <button
                        onClick={() => setTypeFilter("all")}
                        className="ml-1 text-purple-500 hover:text-purple-700"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-700 rounded-full border border-gray-100">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* PROBLEMS LIST */}
          <div className="divide-y divide-gray-100">
            {/* LOADING */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                  <Loader2
                    className="absolute inset-0 m-auto text-blue-500 animate-spin"
                    size={24}
                  />
                </div>
                <p className="mt-4 text-gray-600">Loading your problems...</p>
              </div>
            ) : filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => {
                const status = statusConfig[problem.status];
                const type = typeConfig[problem.type] || {
                  label: problem.type,
                  color: "bg-gray-100 text-gray-800",
                  border: "border-gray-200",
                };
                const StatusIcon = status.icon;
                const TypeIcon = type.icon || FileText;

                return (
                  <div
                    key={problem._id}
                    className="p-6 hover:bg-gray-50/50 transition-colors group cursor-pointer"
                    onClick={() => navigate(`/problem/${problem._id}`)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* LEFT SECTION */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-2 h-2 rounded-full ${status.dot}`}
                          ></div>
                          <span
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full ${status.color} ${status.border}`}
                          >
                            <StatusIcon size={12} className="inline mr-1.5" />
                            {status.label}
                          </span>
                          <span
                            className={`text-xs font-medium px-3 py-1.5 rounded-full ${type.color} ${type.border}`}
                          >
                            <TypeIcon size={12} className="inline mr-1.5" />
                            {type.label}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          {problem.title}
                          <ExternalLink
                            size={14}
                            className="inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </h3>

                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {problem.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {formatDate(problem.createdAt)}
                          </span>
                          {problem.comments && (
                            <span className="flex items-center gap-1.5">
                              <MessageSquare size={14} />
                              {problem.comments.length} comments
                            </span>
                          )}
                        </div>
                      </div>

                      {/* RIGHT SECTION - ACTIONS */}
                      <div className="flex items-center gap-3 lg:gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            disabled={problem.status === "solved"}
                            onClick={(e) => handleMarkSolved(e, problem)}
                            className={`p-2 rounded-lg transition-colors ${
                              problem.status === "solved"
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-emerald-600 hover:bg-emerald-50"
                            }`}
                            title="Mark Solved"
                          >
                            <CheckCircle size={18} />
                          </button>

                          {problem.type === "paid" &&
                            problem.status !== "solved" && (
                              <button
                                onClick={(e) => handleMarkFailed(e, problem)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Mark Failed"
                              >
                                <AlertTriangle size={18} />
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              /* EMPTY STATE */
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No problems found
                </h3>
                <p className="text-gray-600 text-center max-w-md mb-6">
                  {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                    ? "No problems match your current filters. Try adjusting your search or filters."
                    : "You haven't submitted any problems yet. Start by submitting your first problem."}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setTypeFilter("all");
                    navigate("/post-problem");
                  }}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  <PlusCircle size={20} />
                  Submit Your First Problem
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER STATS */}
        {!loading && filteredProblems.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {filteredProblems.length} of {myProblems.length} problems
            {searchTerm && ` • Searching for "${searchTerm}"`}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageProblems;
