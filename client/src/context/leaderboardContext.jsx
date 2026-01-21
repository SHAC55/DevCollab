import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const LeaderboardContext = createContext();

export const LeaderboardProvider = ({ children }) => {
  const [community, setCommunity] = useState([]);
  const [collab, setCollab] = useState([]);
  const [reputation, setReputation] = useState([]);

  const [communityStats, setCommunityStats] = useState(null);
  const [collabStats, setCollabStats] = useState(null);
  const [reputationStats, setReputationStats] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchCommunityLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await api.get("/leaderboard/community", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data.stats)
      setCommunity(res.data.communityLeaderboard);
      setCommunityStats(res.data.stats); //
      
      
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
      const res = await api.get("/leaderboard/collab",{
         headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(res.data.collabLeaderboard)
      setCollab(res.data.collabLeaderboard);
      setCollabStats(res.data.stats); //
      // console.log(res.data.stats)
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
      const res = await api.get("/leaderboard/reputation",{
         headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(res.data.leaderboard)
      setReputation(res.data.reputationLeaderboard);
      setReputationStats(res.data.stats)
      // console.log(res.data.stats)
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
        communityStats,
        collabStats,reputationStats
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboard = () => useContext(LeaderboardContext);
