import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./authContext";
import { toast } from "react-toastify";

const SolutionContext = createContext();

export const SolutionProvider = ({ children }) => {

  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch solutions by problem
  const getSolutionsByProblem = async (problemId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/solution/get-solutions/${problemId}`
      );
      setSolutions(res.data.solutions);
      return res.data.solutions;
    } catch (err) {
      console.error("Error fetching solutions:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Submit solution
  const submitSolution = async (problemId, solutionData) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/solution/submit-solution/${problemId}`,
        solutionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update UI instantly
      setSolutions((prev) => [res.data.newSolution, ...prev]);
      toast.success("Solution submitted successfully");
      return res.data;
    } catch (err) {
      console.error("Error submitting solution:", err);
      toast.error(err.response?.data?.message || "Failed to submit solution");
      throw err;
    }
  };

  // addReactions
  const addReaction =  async(solutionId,type) => {
    try {

      const res =  await axios.post(`${API_BASE_URL}/solution/react/${solutionId}`,
        { type },
        {
          headers  :{
            Authorization : `Bearer ${token}`
          }
        }
      )

      // update only that solution in state
      setSolutions((prev) => // from all solution
      prev.map((sol) => 
        sol._id === solutionId // from  all details  of  solution we  want  id  and  match  it  with solutionId
          ? {
              ...sol, // rest  data  will  be same  update  like
              likes: res.data.likes,
              dislikes: res.data.dislikes,
              currentUserReaction: res.data.currentUserReaction,
            }
          : sol
      )
    );

    toast.success("Reaction updated")

    return res.data ;

    } catch (error) {
      console.error(error);
      toast.error(err.response?.data?.message || "Failed to react");
      throw err;
    }
  }

  return (
    <SolutionContext.Provider
      value={{
        solutions,
        loading,
        getSolutionsByProblem,
        submitSolution,
        addReaction
      }}
    >
      {children}
    </SolutionContext.Provider>
  );
};

export const useSolution = () => useContext(SolutionContext);
