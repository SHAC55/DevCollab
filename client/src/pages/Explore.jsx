import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { IoSearch, IoFilter, IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useProblem } from "../context/problemContext";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const { problems, loading, error, fetchActiveProblems } = useProblem();

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    tags: [],
    sortBy: "newest",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetchActiveProblems();
  }, []);

  const allTags = Array.from(new Set(problems.flatMap((p) => p.tags || [])));

  const filteredProblems = problems.filter((problem) => {
    if (
      searchQuery &&
      !problem.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !problem.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (filters.type !== "all" && problem.type !== filters.type) {
      return false;
    }

    if (
      selectedTags.length > 0 &&
      !selectedTags.some((tag) => problem.tags?.includes(tag))
    ) {
      return false;
    }

    return true;
  });

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_40%),linear-gradient(120deg,#f3ecff,#eef3ff,#ffffff)]">
      <Navbar />

      {/* HEADER SECTION */}
      <div className="px-6 py-12 max-w-8xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 tracking-tight mb-4">
            Explore{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Problems
            </span>
          </h1>
          <p className="text-xl text-gray-600 font-light mb-12 max-w-2xl mx-auto">
            Solve real-world challenges, showcase your skills, and earn rewards
          </p>

          {/* SEARCH & FILTERS */}
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative w-full max-w-2xl mx-auto">
              <IoSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search by title, description, or tags..."
                className="w-full pl-14 pr-12 py-4 rounded-2xl bg-white shadow-lg border border-gray-200 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <IoClose className="text-xl" />
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <IoFilter />
                <span className="font-medium">Filters</span>
                {showFilters ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>

              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value })
                }
                className="px-5 py-3 rounded-xl bg-white shadow-sm border border-gray-200 hover:border-indigo-300 outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="bounty">Highest Bounty</option>
              </select>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Problem Type */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">
                      Problem Type
                    </h3>
                    <div className="flex gap-3">
                      {["all", "free", "paid"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setFilters({ ...filters, type })}
                          className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                            filters.type === type
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 8).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setSelectedTags((prev) =>
                              prev.includes(tag)
                                ? prev.filter((t) => t !== tag)
                                : [...prev, tag]
                            );
                          }}
                          className={`px-3 py-1.5 text-sm rounded-full font-medium transition-all ${
                            selectedTags.includes(tag)
                              ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                {selectedTags.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedTags([])}
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                      <IoClose className="text-sm" />
                      Clear selected tags
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PROBLEMS SECTION */}
      <div className="max-w-8xl mx-auto px-6 pb-16">
        {/* Stats */}
        <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800">
            Problems
            <span className="ml-2 text-gray-500 font-normal">
              ({filteredProblems.length} found)
            </span>
          </h2>

          <div className="flex gap-4 text-sm">
            <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full font-medium">
              {problems.filter((p) => p.type === "paid").length} Paid
            </span>
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-medium">
              {problems.filter((p) => p.type === "free").length} Free
            </span>
          </div>
        </div>

        {/* Loading & Error States */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="max-w-7xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-6">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredProblems.length === 0 && (
          <div className="max-w-7xl mx-auto bg-gray-50 rounded-2xl p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <IoSearch className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No problems found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
          </div>
        )}

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredProblems.map((problem) => (
            <div
              key={problem._id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-indigo-200"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      problem.type === "paid"
                        ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {problem.type === "paid"
                      ? `₹${problem.bounty} BOUNTY`
                      : "FREE"}
                  </span>

                  <span className="text-xs text-gray-500 font-medium">
                    {new Date(problem.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {problem.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {problem.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {problem.tags?.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-3 py-1 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-full border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {problem.tags && problem.tags.length > 3 && (
                    <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
                      +{problem.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100/50 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold uppercase shadow-sm">
                      {(problem.userId?.username || "U").charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {problem.userId?.username || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {problem.type === "paid"
                          ? "Bounty Problem"
                          : "Community Problem"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      console.log(problem._id);
                      navigate(`/problem/${problem._id}`);
                    }}
                    className="px-4 py-2 bg-white text-indigo-600 ..."
                  >
                    {problem.type === "paid" ? "Bid" : "Solve"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
