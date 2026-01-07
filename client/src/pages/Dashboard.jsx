import React from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <section className="bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_40%),linear-gradient(120deg,#f3ecff,#eef3ff,#ffffff)] min-h-screen">
      <Navbar />
      <h1>Dashboard</h1>
    </section>
  );
};

export default Dashboard;
