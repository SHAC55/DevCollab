import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios"; // ✅ axios instance
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setMsg("");

      const res = await api.post(`/auth/reset-password/${token}`, { password });

      toast.success("Password updated successfully"|| res.data.msg)

      setTimeout(() => navigate("/sign-in"), 2000);
    } catch (err) {
      const message = err.response?.data?.msg || "Password reset failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-[350px]"
      >
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          className="w-full border p-2 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {msg && <p className="text-green-600 mt-3 text-sm">{msg}</p>}
        {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
