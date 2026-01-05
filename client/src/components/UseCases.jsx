import React from "react";

const useCases = [
  {
    title: "Startups",
    description: "Build fast, iterate quickly, and scale your product.",
    icon: "🚀",
  },
  {
    title: "Engineering Teams",
    description: "Collaborate across teams and ship high-quality software.",
    icon: "💻",
  },
  {
    title: "Freelancers",
    description: "Work with clients efficiently and deliver faster.",
    icon: "🧑‍💻",
  },
  {
    title: "Open Source",
    description: "Collaborate with contributors from around the world.",
    icon: "🌍",
  },
];

const UseCases = () => {
  return (
    <section className="w-full px-6 py-24 flex justify-center">
      <div className="max-w-7xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">
          Built for Every Development Team
        </h2>
        <p className="mt-4 text-slate-600 text-center">
          DevCollab adapts to your workflow, no matter your team size.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white/60 backdrop-blur border border-white/50 p-6 shadow-md"
            >
              <div className="text-indigo-500 text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
