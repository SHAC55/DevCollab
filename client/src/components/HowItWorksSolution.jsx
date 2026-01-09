// HowItWorksSolution.jsx - Responsive Fix
import { CheckCircle2, Trophy, Clock, DollarSign, Target, Shield, Award, Sparkles } from "lucide-react";

const HowItWorksSolution = ({ isFree }) => {
  const freeSteps = [
    { icon: Target, title: "Submit Solution", desc: "Share your approach", time: "5-10 min" },
    { icon: Shield, title: "Community Review", desc: "Reviewed by owner & votes", time: "1-3 days" },
    { icon: Trophy, title: "Best Solution", desc: "Earn reputation points", time: "Reward in 24h" }
  ];

  const paidSteps = [
    { icon: DollarSign, title: "Place Bid", desc: "Submit competitive bid", time: "Competitive" },
    { icon: Clock, title: "Bid Selection", desc: "Best price & expertise", time: "24-48h" },
    { icon: Award, title: "Secure Payment", desc: "Paid after delivery", time: "Guaranteed" }
  ];

  const steps = isFree ? freeSteps : paidSteps;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500">
          <Sparkles className="text-white" size={16} />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            How It Works
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            {isFree ? "Community process" : "Bidding process"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            {/* Step number */}
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-sm sm:text-base font-bold text-indigo-700">{index + 1}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                  {step.title}
                </h4>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={10} />
                  {step.time}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-4 sm:my-6 border-t border-gray-200" />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-lg sm:text-xl font-bold text-gray-900">
            {isFree ? "Free" : "$50+"}
          </div>
          <div className="text-xs text-gray-600">
            {isFree ? "No Cost" : "Min Bid"}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-lg sm:text-xl font-bold text-gray-900">
            {isFree ? "24h" : "48h"}
          </div>
          <div className="text-xs text-gray-600">
            {isFree ? "Response Time" : "Selection"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSolution;