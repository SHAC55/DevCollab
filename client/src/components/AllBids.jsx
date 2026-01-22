import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  DollarSign,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Loader2,
  Crown,
  TrendingUp,
  TrendingDown,
  Award,
  Users,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { useSolution } from "../context/solutionContext";
import { useAuth } from "../context/authContext";
import { useProblem } from "../context/problemContext";

const AllBids = () => {
  const { id } = useParams();
  const { getAllBidsByProblem, selectBid } = useSolution();
  const { user } = useAuth();
  const { fetchProblemById } = useProblem();

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectingId, setSelectingId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [problemTitle, setProblemTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // fetch bids
        const bidData = await getAllBidsByProblem(id);
        setBids(bidData || []);

        // fetch problem to check owner
        const problemRes = await fetchProblemById(id);
        const problem = problemRes.problem || problemRes;
        setProblemTitle(problem.title || "Project");

        // OWNER CHECK
        const userId = user?._id || user?.id;
        const problemOwnerId =
          typeof problem.userId === "object"
            ? problem.userId._id
            : problem.userId;
        const owner = String(userId) === String(problemOwnerId);

        setIsOwner(owner);
      } catch (error) {
        console.error("Failed to load bids:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && user) loadData();
  }, [id, user]);

  const handleSelectBid = async (bidId) => {
    try {
      setSelectingId(bidId);
      await selectBid(id, bidId);

      // refresh bids after selecting
      const updated = await getAllBidsByProblem(id);
      setBids(updated || []);
    } catch (err) {
      console.error("Select bid error:", err);
    } finally {
      setSelectingId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />;
      case "rejected":
        return <XCircle className="w-3.5 h-3.5 text-red-500" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  // Calculate statistics
  const averageBid = Math.round(
    bids.reduce((sum, bid) => sum + bid.amount, 0) / (bids.length || 1),
  );
  const minBid = bids.length ? Math.min(...bids.map((b) => b.amount)) : 0;
  const maxBid = bids.length ? Math.max(...bids.map((b) => b.amount)) : 0;
  const acceptedBidId = bids.find((b) => b.status === "accepted")?._id;
  const pendingBids = bids.filter((b) => b.status === "pending").length;

  // Skeleton Loader
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header skeleton */}
        <div className="animate-pulse mb-6">
          <div className="h-7 bg-gray-200 rounded-lg w-56 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-80"></div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded-lg w-20 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>

        {/* Bids skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="space-y-1.5">
                    <div className="h-3.5 bg-gray-200 rounded w-20"></div>
                    <div className="h-2.5 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
              </div>
              <div className="space-y-1.5 mb-3">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-3 bg-gray-200 rounded w-14"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!bids.length) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center py-12 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <DollarSign className="w-10 h-10 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No bids yet</h3>
          <p className="text-gray-600 max-w-sm mx-auto mb-6 text-sm">
            Be the first to place a bid on this project!
          </p>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all text-sm">
            <Sparkles className="w-4 h-4" />
            Share Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5">
              Bids for "{problemTitle}"
            </h1>
            <p className="text-gray-600 text-sm">
              {bids.length} proposals • ${minBid} - ${maxBid} range
            </p>
          </div>
          {isOwner && pendingBids > 0 && !acceptedBidId && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 rounded-lg font-medium border border-emerald-200 text-sm">
              <Award className="w-4 h-4" />
              {pendingBids} pending {pendingBids === 1 ? "bid" : "bids"}
            </div>
          )}
        </div>

        {/* Stats Cards - Compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-bold text-gray-900">
                {bids.length}
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-xs font-medium text-gray-600">Total Bids</div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-bold text-gray-900">
                 ₹{averageBid}
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-xs font-medium text-gray-600">Avg. Bid</div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-bold text-gray-900">₹{minBid}</div>
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <div className="text-xs font-medium text-gray-600">Lowest</div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-bold text-gray-900">₹{maxBid}</div>
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="text-xs font-medium text-gray-600">Highest</div>
          </div>
        </div>
      </div>

      {/* Bids Grid - Compact Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {bids.map((bid) => {
          const isAccepted = bid.status === "accepted";
          const isSelectable =
            isOwner && bid.status === "pending" && !acceptedBidId;

          return (
            <div
              key={bid._id}
              className={`group bg-white rounded-xl border transition-all duration-200 hover:shadow-md relative
                ${
                  isAccepted
                    ? "border-emerald-300 ring-1 ring-emerald-100"
                    : "border-gray-200 hover:border-purple-200"
                }`}
            >
              {/* Accepted badge */}
              {isAccepted && (
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="p-5">
                {/* Header - Compact */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center
                      ${
                        isAccepted
                          ? "bg-gradient-to-br from-emerald-100 to-teal-100"
                          : "bg-gradient-to-br from-purple-100 to-indigo-100"
                      }`}
                    >
                      <User
                        className={`w-5 h-5 ${isAccepted ? "text-emerald-600" : "text-purple-600"}`}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        @{bid.userId?.username || "Anonymous"}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(bid.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium ${getStatusColor(
                      bid.status,
                    )}`}
                  >
                    {getStatusIcon(bid.status)}
                    {bid.status}
                  </span>
                </div>

                {/* Proposal - Compact */}
                <p className="text-gray-700 text-sm line-clamp-2 mb-4 leading-relaxed">
                  {bid.proposal}
                </p>

                {/* Details Bar - Compact */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      {bid.estimatedDays && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {bid.estimatedDays} days
                        </span>
                      )}
                      {bid.link && (
                        <a
                          href={bid.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Portfolio
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      ₹{bid.amount.toLocaleString()}
                    </div>
                    {bid.estimatedDays && (
                      <div className="text-xs text-gray-500">
                        ₹{Math.round(bid.amount / bid.estimatedDays)}/day
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons - Compact */}
                {isSelectable && (
                  <button
                    onClick={() => handleSelectBid(bid._id)}
                    disabled={selectingId === bid._id}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2.5 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 disabled:opacity-70 transition-all text-sm"
                  >
                    {selectingId === bid._id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Selecting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Select This Bid
                      </>
                    )}
                  </button>
                )}

                {isAccepted && (
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() =>
                        navigate(`/chat/${id}`, {
                          state: {
                            otherUserId: bid.userId?._id,
                            otherUserName: bid.userId?.username,
                          },
                        })
                      }
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2.5 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all text-sm"
                    >
                      💬 Message Developer
                    </button>

                    <div className="text-center text-xs text-emerald-600 font-medium px-3 py-1.5 bg-emerald-50 rounded">
                      Selected for this project
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note - Compact */}
      {isOwner && !acceptedBidId && pendingBids > 0 && (
        <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-0.5">
                Review pending bids
              </h4>
              <p className="text-gray-700 text-xs">
                You have{" "}
                <span className="font-medium text-blue-600">{pendingBids}</span>{" "}
                proposals awaiting your decision.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBids;
