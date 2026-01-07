import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProblem } from "../context/problemContext";
import { useAuth } from "../context/authContext";
import { 
  Clock, 
  Tag, 
  GitBranch, 
  MessageSquare, 
  DollarSign, 
  Lock, 
  Unlock, 
  ArrowLeft,
  Code,
  Send,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Shield,
  TrendingUp,
  Eye
} from "lucide-react";

const ProblemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProblemById, submitSolution, submitBid } = useProblem();
  const { user } = useAuth();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solutionText, setSolutionText] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);
        const data = await fetchProblemById(id);
        setProblem(data.problem || data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [id]);

  const handleSubmitSolution = async () => {
    if (!solutionText.trim()) return;
    
    setIsSubmitting(true);
    try {
      await submitSolution(id, solutionText);
      setSolutionText("");
      // Show success message
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitBid = async () => {
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) return;
    
    setIsSubmitting(true);
    try {
      await submitBid(id, Number(bidAmount));
      setBidAmount("");
      // Show success message
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">Problem not found</h2>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const isFree = problem.type === "free";
  const isOwner = user?.id === problem.userId;
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_40%),linear-gradient(120deg,#f3ecff,#eef3ff,#ffffff)]   ">
      {/* Back Navigation */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Problems</span>
            </button>
            
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                problem.status === 'open' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {problem.status === 'open' ? (
                  <CheckCircle size={14} />
                ) : (
                  <Lock size={14} />
                )}
                {problem.status.charAt(0).toUpperCase() + problem.status.slice(1)}
              </span>
              
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                isFree 
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {isFree ? <Unlock size={14} /> : <DollarSign size={14} />}
                {isFree ? 'Free' : 'Paid'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Problem Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Problem Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{problem.title}</h1>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <User size={16} />
                      <span className="text-sm">Posted by {problem.userId.username}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Calendar size={16} />
                      <span className="text-sm">{formatDate(problem.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Eye size={16} />
                      <span className="text-sm">{problem.solutionsCount } solutions</span>
                    </div>
                  </div>
                </div>
                
                {!isOwner && (
                  <button className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                    <Shield size={18} className="inline mr-2" />
                    Get Solution
                  </button>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {problem.tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                  >
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Repository Link */}
              {problem.repoLink && (
                <div className="mb-8">
                  <a
                    href={problem.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <GitBranch size={18} />
                    <span className="font-medium">View Repository</span>
                  </a>
                </div>
              )}

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "description"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("solutions")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "solutions"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Solutions ({problem.solutionsCount || 0})
                  </button>
                  <button
                    onClick={() => setActiveTab("discussion")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "discussion"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Discussion
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="prose max-w-none">
                {activeTab === "description" && (
                  <div>
                    <p className="text-gray-700 whitespace-pre-wrap">{problem.description}</p>
                  </div>
                )}
                {activeTab === "solutions" && (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No solutions yet
                    </h3>
                    <p className="text-gray-600">
                      Be the first to provide a solution to this problem
                    </p>
                  </div>
                )}
                {activeTab === "discussion" && (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Start a discussion
                    </h3>
                    <p className="text-gray-600">
                      Ask questions or share insights about this problem
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Solution/Bid Form */}
            {!isOwner && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {isFree ? 'Submit Your Solution' : 'Place Your Bid'}
                </h2>
                
                {isFree ? (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Code size={16} className="inline mr-2" />
                        Your Solution
                      </label>
                      <textarea
                        value={solutionText}
                        onChange={(e) => setSolutionText(e.target.value)}
                        placeholder="Describe your solution in detail. Include code snippets, explanations, and any relevant links..."
                        className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <Clock size={14} className="inline mr-1" />
                        Your solution will be reviewed by the problem owner
                      </div>
                      <button
                        onClick={handleSubmitSolution}
                        disabled={isSubmitting || !solutionText.trim()}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Submit Solution
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign size={16} className="inline mr-2" />
                        Your Bid Amount (USD)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          placeholder="0.00"
                          className="pl-8 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          disabled={isSubmitting}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        This is the amount you're willing to accept for solving this problem
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <TrendingUp size={14} className="inline mr-1" />
                        Lowest bid gets priority
                      </div>
                      <button
                        onClick={handleSubmitBid}
                        disabled={isSubmitting || !bidAmount}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Placing Bid...
                          </>
                        ) : (
                          <>
                            <DollarSign size={18} />
                            Place Bid
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Info & Stats */}
          <div className="space-y-6">
            {/* Problem Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp size={20} />
                Problem Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Type</span>
                  <span className={`font-medium ${isFree ? 'text-blue-600' : 'text-purple-600'}`}>
                    {isFree ? 'Free' : 'Paid'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${
                    problem.status === 'open' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {problem.status.charAt(0).toUpperCase() + problem.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Solutions</span>
                  <span className="font-medium text-gray-900">
                    {problem.solutionsCount || 0}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(problem.createdAt)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(problem.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* How it Works */}
            <div className={`rounded-2xl p-6 border ${
              isFree 
                ? 'bg-blue-50 border-blue-100' 
                : 'bg-purple-50 border-purple-100'
            }`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                {isFree ? (
                  <>
                    <Unlock size={20} />
                    Free Problem
                  </>
                ) : (
                  <>
                    <DollarSign size={20} />
                    Paid Problem
                  </>
                )}
              </h3>
              
              {isFree ? (
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Submit your solution for free</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Problem owner reviews all solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Best solution gets accepted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Build your reputation</span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Place your competitive bid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Lowest bid gets selected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Complete the work upon acceptance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Get paid after delivery</span>
                  </li>
                </ul>
              )}
            </div>

            {/* Need Help Card */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Have questions about this problem or the bidding process?
              </p>
              <button className="w-full bg-white text-gray-900 py-2.5 px-4 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;