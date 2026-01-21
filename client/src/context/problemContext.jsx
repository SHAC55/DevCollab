import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const ProblemContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProblemProvider = ({ children }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myProblems, setMyProblems] = useState([]);

  const token = localStorage.getItem("token");

  const fetchActiveProblems = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get(`/problem/active-problems`);
      // console.log(data.problems);
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

  // create problem
  const createProblem = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.post(`/problem/post`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
  const fetchProblemById = async (problemId, solutionId) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/problem/${problemId}`);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // get  all user problems
  const getAllUserProblems = async () => {
    try {
      setLoading(true);
      const res = await api.get("/problem/myproblems", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyProblems(res.data.problems);
      // console.log("My problems:", res.data.problems);
    } catch (error) {
      console.error("Fetch my problems error:", error);
    } finally {
      setLoading(false);
    }
  };

  const markSolved = async (problemId, payload = {}) => {
    try {
      setLoading(true);
      setError(null);

      // payload = {} for FREE problem
      // payload = { qualityRating, deliveryOnTime } for PAID

      const { data } = await api.post(
        `/problem/markedassolved/${problemId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.success) {
        // update local states
        setProblems((prev) =>
          prev.map((p) =>
            p._id === problemId ? { ...p, status: "solved" } : p,
          ),
        );

        setMyProblems((prev) =>
          prev.map((p) =>
            p._id === problemId ? { ...p, status: "solved" } : p,
          ),
        );
      }

      return data;
    } catch (err) {
      console.error("Mark solved error:", err);
      setError(err.response?.data?.message || "Failed to mark solved");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const markFailed = async (problemId) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.post(
        `/problem/markasfailed/${problemId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.success) {
        setProblems((prev) =>
          prev.map((p) =>
            p._id === problemId ? { ...p, status: "failed" } : p,
          ),
        );

        setMyProblems((prev) =>
          prev.map((p) =>
            p._id === problemId ? { ...p, status: "failed" } : p,
          ),
        );
      }

      return data;
    } catch (err) {
      console.error("Mark failed error:", err);
      setError(err.response?.data?.message || "Failed to mark failed");
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
        myProblems,
        getAllUserProblems,
        markSolved,
        markFailed,
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
