import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const LeaderboardContext = createContext();

export const LeaderboardProvider = ({ children }) => {
  const [community, setCommunity] = useState([]);
  const [collab, setCollab] = useState([]);
  const [reputation, setReputation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCommunityLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await api.get("/leaderboard/community");
    //   console.log(res.data.communityLeaderboard)
      setCommunity(res.data.communityLeaderboard);
    } catch (err) {
      setError("Failed to load community leaderboard");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollabLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await api.get("/leaderboard/collab");
    //   console.log(res.data.collabLeaderboard)
      setCollab(res.data.collabLeaderboard);
    } catch (err) {
      setError("Failed to load collab leaderboard");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReputationLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await api.get("/leaderboard/reputation");
    //   console.log(res.data.leaderboard)
      setReputation(res.data.reputationLeaderboard);
    } catch (err) {
      setError("Failed to load reputation leaderboard");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LeaderboardContext.Provider
      value={{
        community,
        collab,
        reputation,
        loading,
        error,
        fetchCommunityLeaderboard,
        fetchCollabLeaderboard,
        fetchReputationLeaderboard,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboard = () => useContext(LeaderboardContext);
