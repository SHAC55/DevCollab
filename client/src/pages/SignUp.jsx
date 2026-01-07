import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Github,
  Linkedin,
  Mail,
  User,
  Lock,
  Briefcase,
} from "lucide-react";
import { useAuth } from "../context/authContext";

const SignUp = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // remove frontend-only fields
      const { confirmPassword, terms, ...payload } = data;

      await registerUser(payload);
      navigate("/dashboard"); // or "/"
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8
      bg-gradient-to-br from-slate-50 via-white to-indigo-50"
    >
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-2xl rounded-2xl bg-white/90 backdrop-blur-xl
        border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]
        shadow-indigo-100/50 p-6 sm:p-8"
      >
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full blur-xl opacity-60" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-xl opacity-60" />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg mb-4">
            <User className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Join DevCollab
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Start collaborating with developers worldwide
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Row 1: Username & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  placeholder="john_doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200
                  bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                  focus:border-transparent transition-all duration-200
                  placeholder:text-slate-400 text-slate-700"
                />
              </div>
              {errors.username && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message: "Enter a valid Gmail address",
                    },
                  })}
                  type="email"
                  placeholder="you@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200
                  bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                  focus:border-transparent transition-all duration-200
                  placeholder:text-slate-400 text-slate-700"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Password */}
            <div>
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
                      value: 8,
                      message: "Minimum 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)/,
                      message: "Must contain letters and numbers",
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
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200
                  bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                  focus:border-transparent transition-all duration-200
                  placeholder:text-slate-400 text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2
                  text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Profession (Full Width) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Profession
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                {...register("profession", {
                  required: "Please select a profession",
                })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200
                bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                focus:border-transparent transition-all duration-200
                appearance-none text-slate-700 cursor-pointer"
              >
                <option value="">Select your role</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>Mobile Developer</option>
                <option>DevOps Engineer</option>
                <option>UI/UX Designer</option>
                <option>Student</option>
                <option>Freelancer</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {errors.profession && (
              <p className="mt-2 text-sm text-red-500">
                {errors.profession.message}
              </p>
            )}
          </div>

          {/* Row 3: GitHub & LinkedIn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* GitHub */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                GitHub Profile
              </label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  {...register("github", {
                    required: "GitHub profile is required",
                    pattern: {
                      value: /^https?:\/\/(www\.)?github\.com\/.+$/,
                      message: "Enter a valid GitHub URL",
                    },
                  })}
                  placeholder="https://github.com/username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200
                  bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                  focus:border-transparent transition-all duration-200
                  placeholder:text-slate-400 text-slate-700"
                />
              </div>
              {errors.github && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.github.message}
                </p>
              )}
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                LinkedIn Profile
              </label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  {...register("linkedin", {
                    required: "LinkedIn profile is required",
                    pattern: {
                      value: /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
                      message: "Enter a valid LinkedIn URL",
                    },
                  })}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200
                  bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                  focus:border-transparent transition-all duration-200
                  placeholder:text-slate-400 text-slate-700"
                />
              </div>
              {errors.linkedin && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.linkedin.message}
                </p>
              )}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
              className="w-4 h-4 rounded border-slate-300 text-indigo-600
              focus:ring-indigo-500 focus:ring-offset-0"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-slate-600">
              I agree to the{" "}
              <a
                href="#"
                className="text-indigo-600 hover:underline font-medium"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-indigo-600 hover:underline font-medium"
              >
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-500">{errors.terms.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500
          py-3.5 text-white font-semibold shadow-lg shadow-indigo-500/25
          hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02]
          active:scale-[0.98] transition-all duration-200"
        >
          Create Account
        </button>

        {/* Divider */}
        <div className="mt-6 flex items-center">
          <div className="flex-1 border-t border-slate-200"></div>
          <span className="px-4 text-sm text-slate-500">Or continue with</span>
          <div className="flex-1 border-t border-slate-200"></div>
        </div>

        {/* Social Login */}
        <div className="mt-6 grid grid-cols-2 gap-3">
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
            <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
