import React from "react";

const steps = [
  {
    step: "1",
    title: "Create a Workspace",
    description: "Set up your workspace and organize your projects in minutes.",
    icon: "🗂️",
  },
  {
    step: "2",
    title: "Invite Your Team",
    description: "Invite team members and start collaborating instantly.",
    icon: "👥",
  },
  {
    step: "3",
    title: "Build & Ship",
    description: "Collaborate, deploy, and monitor your product in real-time.",
    icon: "🚀",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full px-6 py-24 flex justify-center">
      <div className="max-w-7xl w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          How DevCollab Works
        </h2>
        <p className="mt-4 text-slate-600">
          Get started and collaborate in just a few simple steps.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white/60 backdrop-blur border border-white/50 p-8 shadow-lg"
            >
              <div className="text-indigo-500 text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900">
                {item.step}. {item.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
