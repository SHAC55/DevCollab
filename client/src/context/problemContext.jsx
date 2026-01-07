import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const ProblemContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProblemProvider = ({ children }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActiveProblems = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `${API_BASE_URL}/problem/active-problems`
      );

      if (data.success) {
        setProblems(data.problems);
      }
    } catch (err) {
      console.error("Error fetching problems:", err);
      setError("Failed to load problems");
    } finally {
      setLoading(false);
    }
  };

  // NEW: create problem
  const createProblem = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post(
        `${API_BASE_URL}/problem/post`,
        payload,
        { withCredentials: true } // if using auth cookies
      );

      if (data.success) {
        // optional: add to top of list instantly
        setProblems((prev) => [data.problem, ...prev]);
      }

      return data;
    } catch (err) {
      console.error("Error creating problem:", err);
      setError(err.response?.data?.message || "Failed to post problem");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // problem by id
   const fetchProblemById = async (problemId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_BASE_URL}/problem/${problemId}`
      );
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProblemContext.Provider
      value={{
        problems,
        loading,
        error,
        fetchActiveProblems,
        createProblem,
        fetchProblemById,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
};

export const useProblem = () => {
  const context = useContext(ProblemContext);
  if (!context) {
    throw new Error("useProblem must be used within ProblemProvider");
  }
  return context;
};
