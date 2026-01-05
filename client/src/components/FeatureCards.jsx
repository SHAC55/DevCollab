import React from "react";

const FeatureCards = () => {
  return (
    <section className="w-full px-6 py-24 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Card 1 */}
        <div className="rounded-3xl bg-white/60 backdrop-blur border border-white/50 p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              📋
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Plan Tasks & Projects
            </h3>
          </div>

          <div className="space-y-3 mb-6">
            <TaskItem label="Refactor API" checked />
            <TaskItem label="Design Landing Page" />
            <TaskItem label="Fix Bug Report" disabled />
          </div>

          <p className="text-sm text-slate-600">
            Plan and track work seamlessly with task boards and to-do lists.
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-3xl bg-white/60 backdrop-blur border border-white/50 p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              {"</>"}
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Code & Collaborate
            </h3>
          </div>

          <div className="space-y-4 mb-6">
            <div className="rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
              function fetchData() {"{"}
              <br />
              &nbsp;&nbsp;const res = await fetch('/api/data')
              <br />
              {"}"}
            </div>

            <Comment
              user="Rachel"
              time="1m"
              text="Let's review the new API changes"
            />
            <Comment
              user="Max"
              time="Now"
              text="Looks great! Ready to deploy"
            />
          </div>

          <p className="text-sm text-slate-600">
            Write code together with live editing, comments, and chat.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-3xl bg-white/60 backdrop-blur border border-white/50 p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              🚀
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Deploy & Monitor
            </h3>
          </div>

          <div className="space-y-4 mb-6">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">
                Frontend Production
              </p>
              <p className="text-xs text-slate-500">Finished 3m ago</p>
            </div>

            <div className="flex justify-between text-sm text-slate-600">
              <span>60,274 requests</span>
              <span className="text-green-500">99.9%</span>
            </div>

            <div className="h-20 rounded-xl bg-gradient-to-r from-emerald-100 to-emerald-200" />
          </div>

          <p className="text-sm text-slate-600">
            Deploy smoothly and monitor in real-time with detailed stats.
          </p>
        </div>

      </div>
    </section>
  );
};

/* ---------- Helper Components ---------- */

const TaskItem = ({ label, checked, disabled }) => (
  <div
    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm
      ${disabled ? "bg-slate-100 text-slate-400" : "bg-slate-50 text-slate-700"}
    `}
  >
    <span>{label}</span>
    {checked && <span className="text-green-500">✔</span>}
  </div>
);

const Comment = ({ user, time, text }) => (
  <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2 shadow-sm">
    <div>
      <p className="text-sm font-medium text-slate-700">{user}</p>
      <p className="text-xs text-slate-500">{text}</p>
    </div>
    <span className="text-xs text-slate-400">{time}</span>
  </div>
);

export default FeatureCards;
    