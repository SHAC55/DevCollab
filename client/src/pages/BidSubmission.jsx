import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSolution } from "../context/solutionContext";
import {
  ArrowLeft,
  Send,
  DollarSign,
  MessageSquare,
  Link as LinkIcon,
  Calendar,
  Clock,
  Target,
  Award,
  Shield,
  Sparkles,
  TrendingUp,
  FileText,
  Zap,
  CheckCircle,
  ExternalLink,
  Lock
} from "lucide-react";

const BidSubmission = () => {
  const { id } = useParams(); // problemId
  const navigate = useNavigate();
  const { addBid, loading } = useSolution();

  const [proposal, setProposal] = useState("");
  const [amount, setAmount] = useState("");
  const [link, setLink] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");
  const [deliverables, setDeliverables] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!proposal || !amount) {
      alert("Proposal and amount are required");
      return;
    }

    try {
      await addBid(id, {
        proposal,
        amount: parseFloat(amount),
        link: link || undefined,
        estimatedDays: estimatedDays ? parseInt(estimatedDays) : undefined,
        deliverables: deliverables || undefined,
      });

      navigate(`/problems/${id}`);
    } catch (err) {
      console.error("Bid submit failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* BACK NAVIGATION */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center group-hover:border-purple-300 group-hover:bg-purple-50 transition-all">
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
          </div>
          <span className="font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
            Back to Project
          </span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - GUIDELINES */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* WINNING BID TIPS */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Winning Bid Tips</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Be specific about your approach and timeline
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Highlight relevant experience and portfolio
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Break down deliverables clearly
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Justify your pricing with value proposition
                    </p>
                  </div>
                </div>
              </div>

              {/* PRIVACY NOTICE */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Bid Privacy</h4>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p>Your proposal details are private to the project owner</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p>Only your name and bid amount are publicly visible</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p>Protect sensitive information in your proposal</p>
                  </div>
                </div>
              </div>

              {/* QUICK STATS */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Competitive Insights
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Avg. Bid Range</span>
                    <span className="font-semibold">₹5,000 - ₹20,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Avg. Duration</span>
                    <span className="font-semibold">7-14 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Acceptance Rate</span>
                    <span className="font-semibold">65%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              {/* HEADER */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Place Your Bid</h1>
                    <p className="text-purple-100 mt-1">
                      Submit your proposal for this project
                    </p>
                  </div>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-8">
                  {/* PROPOSAL */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <MessageSquare className="w-5 h-5 text-gray-600" />
                        Project Proposal
                        <span className="text-sm font-normal text-red-500">*</span>
                      </label>
                      <span className="text-sm text-gray-500">{proposal.length}/1500</span>
                    </div>
                    <div className="relative">
                      <textarea
                        rows={6}
                        value={proposal}
                        onChange={(e) => setProposal(e.target.value)}
                        placeholder="Describe your approach, methodology, relevant experience, and why you're the best fit for this project. Be detailed and specific."
                        className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 hover:bg-white"
                        maxLength={1500}
                        required
                      />
                      <div className="absolute bottom-3 right-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-purple-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BID DETAILS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* AMOUNT */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        Bid Amount (₹)
                        <span className="text-sm text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="5000"
                          className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-gray-50 hover:bg-white transition-colors"
                          min="50"
                          required
                        />
                        <span className="absolute right-4 top-3.5 text-gray-500">₹</span>
                      </div>
                      {amount && (
                        <p className="text-sm text-gray-500 mt-2">
                          ≈ ${(parseFloat(amount) / 83).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })} USD
                        </p>
                      )}
                    </div>

                    {/* ESTIMATED DAYS */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <Clock className="w-4 h-4 text-gray-500" />
                        Estimated Timeline
                        <span className="text-xs text-gray-400">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input
                          type="number"
                          value={estimatedDays}
                          onChange={(e) => setEstimatedDays(e.target.value)}
                          placeholder="7"
                          className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-gray-50 hover:bg-white transition-colors"
                          min="1"
                        />
                        <span className="absolute right-4 top-3.5 text-gray-500">days</span>
                      </div>
                      {estimatedDays && amount && (
                        <p className="text-sm text-gray-500 mt-2">
                          ≈ ₹{Math.round(parseFloat(amount) / parseInt(estimatedDays))}/day
                        </p>
                      )}
                    </div>
                  </div>

                  {/* DELIVERABLES */}
                  {/* <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                      <Target className="w-4 h-4 text-gray-500" />
                      Key Deliverables
                      <span className="text-xs text-gray-400">(Optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={deliverables}
                      onChange={(e) => setDeliverables(e.target.value)}
                      placeholder="List the specific deliverables you'll provide (e.g., Source code, Documentation, Testing, Deployment...)"
                      className="w-full rounded-xl border border-gray-300 px-5 py-3.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 hover:bg-white"
                    />
                  </div> */}

                  {/* PORTFOLIO LINK */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                      Portfolio / GitHub Link
                      <span className="text-xs text-gray-400">(Optional)</span>
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://github.com/username or https://portfolio.com"
                        className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-gray-50 hover:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* BID SUMMARY */}
                  {(amount || estimatedDays) && (
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-6">
                      <h4 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Bid Summary
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {amount && (
                          <div className="bg-white rounded-xl p-4 border border-purple-100">
                            <p className="text-sm text-gray-600 mb-1">Total Bid</p>
                            <p className="text-2xl font-bold text-gray-900">₹{parseFloat(amount).toLocaleString()}</p>
                          </div>
                        )}
                        {estimatedDays && (
                          <div className="bg-white rounded-xl p-4 border border-purple-100">
                            <p className="text-sm text-gray-600 mb-1">Timeline</p>
                            <p className="text-2xl font-bold text-gray-900">{estimatedDays} days</p>
                          </div>
                        )}
                        {amount && estimatedDays && (
                          <div className="bg-white rounded-xl p-4 border border-purple-100">
                            <p className="text-sm text-gray-600 mb-1">Daily Rate</p>
                            <p className="text-2xl font-bold text-gray-900">₹{Math.round(parseFloat(amount) / parseInt(estimatedDays)).toLocaleString()}</p>
                          </div>
                        )}
                        <div className="bg-white rounded-xl p-4 border border-purple-100">
                          <p className="text-sm text-gray-600 mb-1">Type</p>
                          <p className="text-xl font-bold text-gray-900">Fixed Price</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex-1 px-6 py-3.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all hover:border-gray-400"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={loading || !proposal.trim() || !amount}
                        className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Submitting Bid...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Place Bid
                          </>
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                      <Shield className="w-4 h-4" />
                      <p>Your proposal details are secured and private</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* SUCCESS TIPS */}
            {/* <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-900 mb-2">Increase Your Chances</h4>
                  <ul className="space-y-2 text-sm text-emerald-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Submit within 24 hours for better visibility
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Include portfolio links to build trust
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Be responsive if the client has questions
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidSubmission;