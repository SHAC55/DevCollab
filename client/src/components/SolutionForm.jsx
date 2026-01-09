// SolutionForm.jsx - Responsive Fix
import { useState } from "react";
import { Send, Gem, Code, Zap } from "lucide-react";

const SolutionForm = ({ isFree, onSubmitSolution, onSubmitBid }) => {
  const [text, setText] = useState("");
  const [bid, setBid] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500">
          {isFree ? (
            <Code className="text-white" size={20} />
          ) : (
            <Gem className="text-white" size={20} />
          )}
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            {isFree ? "Submit Solution" : "Place Your Bid"}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm">
            {isFree
              ? "Help the community learn"
              : "Get rewarded for your skills"}
          </p>
        </div>
      </div>

      {isFree ? (
        <div className="space-y-3 sm:space-y-4">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-32 sm:h-40 border border-gray-300 rounded-lg sm:rounded-xl p-3 sm:p-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all resize-none text-sm sm:text-base"
              placeholder="Describe your solution..."
              disabled={isSubmitting}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {text.length}/2000
            </div>
          </div>
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <Zap size={12} className="text-amber-500" />
              <span>Markdown supported</span>
            </div>
            <button
              onClick={async () => {
                try {
                  setIsSubmitting(true);
                  await onSubmitSolution(text); // wait till API success
                  setText(""); // ✅ reset textarea
                } catch (err) {
                  console.error(err);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              disabled={isSubmitting || !text.trim()}
              className="w-full xs:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Solution
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Bid Amount ($)
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </div>
              <input
                type="number"
                value={bid}
                onChange={(e) => setBid(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-sm sm:text-base"
                placeholder="Enter bid amount"
                disabled={isSubmitting}
                min="1"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Minimum bid: $50 • Payment upon acceptance
            </p>
          </div>

          <button
            onClick={() => onSubmitBid(bid)}
            disabled={isSubmitting || !bid || Number(bid) < 50}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 sm:px-6 py-3 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:from-violet-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Placing Bid...
              </>
            ) : (
              <>
                <Gem size={16} />
                Place Your Bid
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SolutionForm;
