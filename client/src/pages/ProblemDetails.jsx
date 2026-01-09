import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProblem } from "../context/problemContext";
import { useAuth } from "../context/authContext";
import { useSolution } from "../context/solutionContext";
import ProblemHeader from "../components/ProblemHeader";
import ProblemTabs from "../components/ProblemTabs";
import SolutionForm from "../components/SolutionForm";
import ProblemStats from "../components/ProblemStats";
import HowItWorksSolution from "../components/HowItWorksSolution";

const ProblemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchProblemById, submitBid } = useProblem();
  const { user } = useAuth();
  const {
    solutions,
    loading: solutionLoading,
    getSolutionsByProblem,
    submitSolution,
  } = useSolution();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (id) getSolutionsByProblem(id);
  }, [id]);

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);
        const data = await fetchProblemById(id);
        setProblem(data.problem || data);
      } finally {
        setLoading(false);
      }
    };
    loadProblem();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!problem) return <div>Problem not found</div>;

  const isFree = problem.type === "free";
  const isOwner = user?.id === problem.userId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <ProblemHeader
        problem={problem}
        isFree={isFree}
        isOwner={isOwner}
        onBack={() => navigate(-1)}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProblemTabs
            problem={problem}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            solutions={solutions}
            solutionLoading={solutionLoading}
          />

          {!isOwner && (
            <SolutionForm
              isFree={isFree}
              onSubmitSolution={(text) =>
                submitSolution(id, { description: text, repoLink: "" })
              }
              onSubmitBid={(amt) => submitBid(id, amt)}
            />
          )}
        </div>

        <div className="space-y-6">
          <ProblemStats problem={problem} />
          <HowItWorksSolution isFree={isFree} />
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;
