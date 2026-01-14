import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSolution } from "../context/solutionContext";
import { 
  Code2, 
  Link as LinkIcon, 
  Send, 
  ArrowLeft,
  GitBranch,
  FileText,
  Sparkles,
  Zap,
  CheckCircle,
  Globe,
  Lock
} from "lucide-react";

const SolutionSubmission = () => {
  const { id } = useParams(); // problemId
  const navigate = useNavigate();
  const { submitSolution, loading } = useSolution();

  const [description, setDescription] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      alert("Please write your solution description");
      return;
    }

    try {
      await submitSolution(id, {
        description,
        repoLink,
        liveLink,
        isPublic
      });

      // go back to problem page
      navigate(`/problems/${id}`);
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* BACK NAVIGATION */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center group-hover:border-indigo-300 group-hover:bg-indigo-50 transition-all">
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
          </div>
          <span className="font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
            Back to Problem
          </span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - GUIDELINES */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Solution Guidelines</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Explain your approach and logic clearly
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Include code examples or snippets if relevant
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Add links to your GitHub repository
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Mention any challenges you overcame
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-rows-1  gap-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-900">Community Impact</h4>
                    <p className="text-sm text-emerald-700 mt-1">
                      Your solution helps others learn and grow
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-900">Get Feedback</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Receive constructive feedback from developers
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* RIGHT COLUMN - FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              {/* HEADER */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                    <Code2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Submit Your Solution</h1>
                    <p className="text-indigo-100 mt-1">
                      Share your approach with the community
                    </p>
                  </div>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-8">
                  {/* DESCRIPTION */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <FileText className="w-5 h-5 text-gray-600" />
                        Solution Description
                      </label>
                      <span className="text-sm text-gray-500">{description.length}/2000</span>
                    </div>
                    <div className="relative">
                      <textarea
                        rows={8}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your solution in detail. Include your thought process, algorithms used, challenges faced, and how you overcame them. Be as detailed as possible to help others learn from your approach."
                        className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 hover:bg-white"
                        maxLength={2000}
                        required
                      />
                      <div className="absolute bottom-3 right-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <Code2 className="w-4 h-4 text-indigo-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LINKS SECTION */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      Project Links
                    </h3>
                    
                    {/* GITHUB REPO */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <GitBranch className="w-4 h-4 text-gray-500" />
                        GitHub Repository
                        <span className="text-xs text-gray-400">(Optional)</span>
                      </label>
                      <div className="relative">
                        <LinkIcon className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input
                          type="url"
                          value={repoLink}
                          onChange={(e) => setRepoLink(e.target.value)}
                          placeholder="https://github.com/username/project-repo"
                          className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 hover:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* LIVE DEMO */}
                    {/* <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <Globe className="w-4 h-4 text-gray-500" />
                        Live Demo URL
                        <span className="text-xs text-gray-400">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input
                          type="url"
                          value={liveLink}
                          onChange={(e) => setLiveLink(e.target.value)}
                          placeholder="https://your-project.vercel.app"
                          className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 hover:bg-white transition-colors"
                        />
                      </div>
                    </div> */}

                    {/* PRIVACY SETTING */}
                    
                  </div>

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
                        disabled={loading || !description.trim()}
                        className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Submit Solution
                          </>
                        )}
                      </button>
                    </div>
                    
                    <p className="text-center text-sm text-gray-500 mt-4">
                      By submitting, you agree to share your solution with the community.
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* EXTRA NOTES */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionSubmission;