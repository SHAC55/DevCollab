import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const DashContext = createContext(null);

export const DashProvider = ({ children }) => {
  const [stats, setStats] = useState(null); // ✅ correct name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get("/dashboard/user-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("DASH DATA:", data);
      setStats(data);
    } catch (err) {
      // console.error("Dashboard API error:", err);
      const msg = err.response?.data?.message || "Failed to load dashboard";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashContext.Provider
      value={{
        stats,        // ✅ now available
        loading,
        error,
        fetchDashboardStats,
      }}
    >
      {children}
    </DashContext.Provider>
  );
};

export const useDash = () => useContext(DashContext);
