import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { FiTag, FiDollarSign, FiCode, FiType, FiAlertCircle } from "react-icons/fi";
import { MdDescription, MdLink } from "react-icons/md";
import { useProblem } from "../context/problemContext"
import { toast } from "react-toastify";
const PostProblem = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      type: "free",
    },
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const problemType = watch("type");

  const{ createProblem } = useProblem()

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit = async (data) => {
  const payload = {
    title: data.title,
    description: data.description,
    type: data.type,
    repoLink: data.repoLink,
    tags: tags,
    bounty: problemType === "paid" ? data.bounty : null,
  };

  try {
    const res = await createProblem(payload);
    console.log("Created:", res);

    toast.success("Problem posted successfully");

    // optional: redirect
    // navigate("/explore");

  } catch (err) {
    alert("Failed to post problem ❌");
  }
};


  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_40%),linear-gradient(120deg,#f3ecff,#eef3ff,#ffffff)]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Post a Problem
          </h1>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Describe your technical issue and let our community of developers help you solve it.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 space-y-8 border border-gray-100"
        >
          {/* Problem Type Toggle */}
          <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-1 rounded-xl inline-block">
            <div className="flex">
              {["free", "paid"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg cursor-pointer transition-all ${problemType === type ? "bg-white shadow-md" : "hover:bg-white/50"}`}
                >
                  <input
                    type="radio"
                    value={type}
                    {...register("type")}
                    className="sr-only"
                  />
                  <div className={`w-3 h-3 rounded-full ${problemType === type ? type === "free" ? "bg-green-500" : "bg-amber-500" : "bg-gray-300"}`} />
                  <span className="font-medium capitalize">
                    {type === "free" ? "Free Help" : "Paid Bounty"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Title */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FiType className="text-indigo-600" />
                  <label className="block text-gray-800 font-semibold">Problem Title</label>
                </div>
                <input
                  type="text"
                  placeholder="e.g., JWT token expires too soon after login"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/80 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                  {...register("title", {
                    required: "Title is required",
                    maxLength: {
                      value: 120,
                      message: "Title must be less than 120 characters"
                    },
                  })}
                />
                {errors.title && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <FiAlertCircle />
                    <span>{errors.title.message}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MdDescription className="text-indigo-600" />
                  <label className="block text-gray-800 font-semibold">Detailed Description</label>
                </div>
                <textarea
                  rows="6"
                  placeholder="Explain the issue in detail, including:\n• Steps to reproduce\n• Expected vs actual behavior\n• Error messages\n• Your environment setup"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/80 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition resize-none"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 50,
                      message: "Please provide at least 50 characters"
                    },
                  })}
                />
                {errors.description && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <FiAlertCircle />
                    <span>{errors.description.message}</span>
                  </div>
                )}
              </div>

              {/* Bounty Amount (Conditional) */}
              {problemType === "paid" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-amber-600" />
                    <label className="block text-gray-800 font-semibold">Bounty Amount</label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500">₹</span>
                    </div>
                    <input
                      type="number"
                      placeholder="500"
                      min="100"
                      step="50"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white/80 outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition"
                      {...register("bounty", {
                        required: "Bounty is required for paid problems",
                        min: {
                          value: 100,
                          message: "Minimum bounty is ₹100"
                        },
                      })}
                    />
                  </div>
                  {errors.bounty && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <FiAlertCircle />
                      <span>{errors.bounty.message}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Repository Link */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MdLink className="text-indigo-600" />
                  <label className="block text-gray-800 font-semibold">Repository Link</label>
                  <span className="text-sm text-gray-500">(Optional)</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiCode className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    placeholder="https://github.com/username/project"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white/80 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                    {...register("repoLink")}
                  />
                </div>
              </div>

              {/* Tags Input */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FiTag className="text-indigo-600" />
                  <label className="block text-gray-800 font-semibold">Tags</label>
                  <span className="text-sm text-gray-500">(Max 5)</span>
                </div>
                
                {/* Tags Display */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="hover:text-red-500 transition"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag (React, Node.js, etc.)"
                    className="flex-1 px-4 py-3.5 rounded-xl border border-gray-200 bg-white/80 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    disabled={tags.length >= 5 || !tagInput.trim()}
                    className="px-5 py-3.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Add
                  </button>
                </div>
                <input
                  type="hidden"
                  {...register("tags", {
                    required: tags.length === 0 && "At least one tag is required",
                  })}
                  value={tags.join(",")}
                />
                {errors.tags && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <FiAlertCircle />
                    <span>{errors.tags.message}</span>
                  </div>
                )}
                <p className="text-sm text-gray-500">
                  {5 - tags.length} tags remaining
                </p>
              </div>

              {/* Extra Spacing for Balance */}
              {/* <div className="h-full min-h-[120px] bg-gradient-to-br from-indigo-50/30 to-purple-50/30 rounded-xl p-6 border border-indigo-100/50">
                <h3 className="font-semibold text-indigo-700 mb-2">Tips for Best Results</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Include specific error messages</li>
                  <li>• Mention your tech stack</li>
                  <li>• Provide relevant code snippets</li>
                  <li>• Add steps to reproduce the issue</li>
                </ul>
              </div> */}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                <>
                  <span className="relative z-10">Post Problem</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </button>
          </div>

          {/* Help Text */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              By posting, you agree to our{" "}
              <a href="#" className="text-indigo-600 hover:underline font-medium">
                community guidelines
              </a>
             
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostProblem;