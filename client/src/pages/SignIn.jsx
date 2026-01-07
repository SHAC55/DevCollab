import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, Github, Chrome, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard"); // or "/"
      toast.success("Logged in successfully!");
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8
      bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full blur-xl opacity-60" />
        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-xl opacity-60" />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to continue collaborating with developers
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative rounded-2xl bg-white/90 backdrop-blur-xl
          border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]
          shadow-indigo-100/50 p-6 sm:p-8"
        >
          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200
                bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                focus:border-transparent transition-all duration-200
                placeholder:text-slate-400 text-slate-700"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200
                bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                focus:border-transparent transition-all duration-200
                placeholder:text-slate-400 text-slate-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2
                text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600
                focus:ring-indigo-500 focus:ring-offset-0"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600">
                Remember me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500
            py-3.5 text-white font-semibold shadow-lg shadow-indigo-500/25
            hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02]
            active:scale-[0.98] transition-all duration-200 mb-6"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl
              border border-slate-200 hover:border-slate-300 hover:bg-slate-50
              transition-all duration-200 text-slate-700 font-medium"
            >
              <Github className="w-5 h-5" />
              GitHub
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl
              border border-slate-200 hover:border-slate-300 hover:bg-slate-50
              transition-all duration-200 text-slate-700 font-medium"
            >
              <Chrome className="w-5 h-5" />
              Google
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50
          border border-indigo-100">
          <p className="text-sm text-slate-700 text-center">
            <span className="font-medium">Demo credentials:</span> test@gmail.com / test1234
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;