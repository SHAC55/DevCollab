import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  Code2,
  DollarSign,
  Eye,
  Clock,
  Tag,
  FileText,
  MessageSquare,
  Shield,
  Award,
  ChevronRight,
  BarChart3,
  Users,
  ExternalLink,
  Bookmark,
  Share2,
  Star,
  TrendingUp,
  Layers,
  Target,
  CheckCircle,
  Sparkles,
  Zap,
  Edit,
} from "lucide-react";

import { useProblem } from "../context/problemContext";
import { useAuth } from "../context/authContext";
import AllSolutions from "../components/AllSolutions";
import AllBids from "../components/AllBids";

/* ---------------- UI HELPERS ---------------- */

const InfoPill = ({ icon: Icon, children, color = "gray" }) => {
  const colorMap = {
    gray: "bg-gray-50 text-gray-700 border-gray-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <span
      className={`flex items-center gap-2 px-4 py-2 rounded-xl ${colorMap[color]} transition-all hover:scale-[1.02]`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{children}</span>
    </span>
  );
};

const StatCard = ({ icon: Icon, label, value, color = "indigo" }) => {
  const colorMap = {
    indigo: "bg-gradient-to-br from-indigo-500 to-purple-600",
    emerald: "bg-gradient-to-br from-emerald-500 to-teal-600",
    amber: "bg-gradient-to-br from-amber-500 to-orange-600",
    purple: "bg-gradient-to-br from-purple-500 to-pink-600",
    gray: "bg-gradient-to-br from-gray-600 to-gray-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

const TechBadge = ({ tech }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 rounded-lg text-sm font-medium border border-gray-200 hover:border-gray-300 transition-all group">
    <Code2 className="w-3.5 h-3.5 text-gray-500 group-hover:text-indigo-500 transition-colors" />
    {tech}
    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
  </span>
);

const ActionButton = ({ icon: Icon, label, onClick, variant = "primary" }) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25",
    secondary:
      "bg-white text-gray-800 border border-gray-200 hover:border-gray-300",
    outline:
      "bg-transparent text-gray-700 border border-gray-300 hover:border-gray-400",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${variants[variant]}`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
};

const TabButton = ({ icon: Icon, label, isActive, onClick, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all relative ${
      isActive
        ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-100"
        : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    <Icon
      className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-gray-500"}`}
    />
    <span className="font-medium">{label}</span>
    {count && (
      <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {count}
      </span>
    )}
  </button>
);

/* ---------------- MAIN PAGE ---------------- */

const ProblemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { fetchProblemById } = useProblem();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);
        const data = await fetchProblemById(id);
        setProblem(data.problem || data);
      } catch (err) {
        setError(err.message || "Failed to load problem");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadProblem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
            <Sparkles className="w-6 h-6 text-indigo-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <p className="mt-6 text-lg font-medium text-gray-700">
            Loading problem details...
          </p>
          <p className="text-sm text-gray-500 mt-2">Fetching the latest data</p>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Problem Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            {error ||
              "The problem you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex gap-3 justify-center">
            <ActionButton
              icon={ArrowLeft}
              label="Go Back"
              onClick={() => navigate(-1)}
              variant="secondary"
            />
            <ActionButton
              icon={ExternalLink}
              label="Browse Problems"
              onClick={() => navigate("/problems")}
              variant="primary"
            />
          </div>
        </div>
      </div>
    );
  }

  const isFree = problem.type === "free";
  const ownerId =
    typeof problem.userId === "object" ? problem.userId._id : problem.userId;

  const userId = user?._id;

  const isOwner = userId === ownerId;

  // console.log(isOwner);
  // console.log(userId);
  // console.log(ownerId);

  const difficultyColor = {
    easy: "bg-emerald-100 text-emerald-800 border-emerald-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    hard: "bg-rose-100 text-rose-800 border-rose-200",
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_40%),linear-gradient(120deg,#f3ecff,#eef3ff,#ffffff)]">
      {/* -------- HEADER -------- */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center group-hover:border-indigo-300 group-hover:bg-indigo-50 transition-all">
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-indigo-600">
                Back to Problems
              </span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isBookmarked
                    ? "bg-amber-50 border-amber-200 text-amber-600"
                    : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
                }`}
              >
                <Bookmark
                  className="w-5 h-5"
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </button>
              <button className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -------- MAIN CONTENT -------- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* -------- TOP SECTION: TITLE & INFO -------- */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 shadow-sm p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${
                      isFree
                        ? "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 border-purple-200"
                    }`}
                  >
                    {isFree ? "Community Problem" : "Premium Project"}
                  </span>
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border capitalize ${
                      difficultyColor[problem.difficulty] ||
                      difficultyColor.medium
                    }`}
                  >
                    {problem.difficulty || "medium"}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                  {problem.title}
                </h1>

                {/* TECH STACK */}
                <div className="flex flex-wrap gap-2">
                  {problem.tags?.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-3 py-1 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-full border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {problem.tags && problem.tags.length > 3 && (
                    <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
                      +{problem.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* META INFO */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <InfoPill icon={User} color="indigo">
                    @{problem.userId?.username || "anonymous"}
                  </InfoPill>
                  <InfoPill icon={Calendar} color="purple">
                    {new Date(problem.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </InfoPill>
                  <InfoPill icon={Eye} color="emerald">
                    {isFree ? problem.solutionsCount : problem.bids}{" "}
                    {isFree ? "solutions" : "bids"}
                  </InfoPill>

                  <InfoPill icon={Clock} color="amber">
                    {problem.estimate || "2-4 hours"}
                  </InfoPill>
                </div>
              </div>
            </div>
          </div>

          {/* -------- MIDDLE SECTION: TABS & ACTION CARDS SIDE BY SIDE -------- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* -------- LEFT: CONTENT TABS -------- */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 p-1">
                  <div className="flex gap-2">
                    <TabButton
                      icon={FileText}
                      label="Description"
                      isActive={activeTab === "description"}
                      onClick={() => setActiveTab("description")}
                    />
                    <TabButton
                      icon={MessageSquare}
                      label="Discussion"
                      isActive={activeTab === "discussion"}
                      onClick={() => setActiveTab("discussion")}
                      count={12}
                    />
                    <TabButton
                      icon={Target}
                      label="Requirements"
                      isActive={activeTab === "requirements"}
                      onClick={() => setActiveTab("requirements")}
                    />
                  </div>
                </div>

                <div className="p-8">
                  {activeTab === "description" && (
                    <div className="prose prose-lg max-w-none">
                      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-8">
                        <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                          {problem.description}
                        </pre>
                      </div>
                    </div>
                  )}

                  {activeTab === "discussion" && (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <MessageSquare className="w-12 h-12 text-indigo-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Discussion Coming Soon
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Join the conversation with other developers working on
                        this problem.
                      </p>
                    </div>
                  )}

                  {activeTab === "requirements" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Clear problem statement</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Expected time to complete</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Tech stack requirements</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Code quality standards</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Testing requirements</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Documentation needed</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* -------- RIGHT: ACTION CARDS -------- */}
            <div className="space-y-6">
              {/* STATS CARD */}

              {/* ACTION CARD */}
              {!isOwner && (
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          isFree
                            ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                            : "bg-gradient-to-br from-emerald-500 to-teal-600"
                        }`}
                      >
                        {isFree ? (
                          <Code2 className="w-7 h-7 text-white" />
                        ) : (
                          <DollarSign className="w-7 h-7 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {isFree ? "Submit Solution" : "Place Your Bid"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {isFree
                            ? "Help the community with your solution"
                            : "Propose your price and timeline"}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={
                        isFree
                          ? `/problems/${id}/submit-solution`
                          : `/problems/${id}/apply-bid`
                      }
                      className="block w-full"
                    >
                      <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        {isFree ? "Submit Solution" : "Place Bid"}
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </Link>

                    <p className="text-center text-sm text-gray-500 mt-4">
                      {isFree
                        ? "Get feedback from the community"
                        : "Competitive pricing increases chances"}
                    </p>
                  </div>
                </div>
              )}

              {/* OWNER ACTIONS */}
              {isOwner && (
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-3xl border border-amber-100 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-amber-600" />
                    <h3 className="font-semibold text-amber-900">
                      You Own This Problem
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <ActionButton
                      icon={Eye}
                      label="View Submissions"
                      onClick={() => navigate(`/problems/${id}/submissions`)}
                      variant="secondary"
                    />
                    <ActionButton
                      icon={Edit}
                      label="Edit Problem"
                      onClick={() => navigate(`/problems/${id}/edit`)}
                      variant="outline"
                    />
                    <ActionButton
                      icon={BarChart3}
                      label="Analytics"
                      onClick={() => navigate(`/problems/${id}/analytics`)}
                      variant="outline"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* -------- BOTTOM SECTION: SOLUTIONS / BIDS -------- */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isFree ? "Community Solutions" : "Project Bids"}
              </h2>
              <p className="text-gray-600">
                {isFree
                  ? "Explore solutions submitted by developers worldwide"
                  : "Check bids placed for this project"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="font-semibold text-gray-900">
                {isFree ? "Top Rated Solutions" : "Best Value Bids"}
              </span>
            </div>
          </div>

          {isFree ? (
            <AllSolutions
              isOwner={isOwner}
              topSolutions={problem.topSolutions || []}
            />
          ) : (
            <AllBids />
          )}
        </section>
      </main>
    </div>
  );
};

export default ProblemDetails;
