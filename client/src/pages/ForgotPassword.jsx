import { useState } from "react";
import api from "../api/axios"; // ✅ your axios instance
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setMsg("");

      const res = await api.post("/auth/forgot-password", { email });

      toast.success("Link send to Mail")
    } catch (err) {
      const message = err.response?.data?.msg || "Failed to send reset link";
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
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {msg && <p className="text-green-600 mt-3 text-sm">{msg}</p>}
        {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
