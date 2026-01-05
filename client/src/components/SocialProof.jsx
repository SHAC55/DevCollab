import React from "react";

const companies = ["Vercel", "Stripe", "Notion", "Linear", "GitHub", "Dribbble"];

const SocialProof = () => {
  return (
    <section className="w-full px-6 py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-sm uppercase tracking-wide text-slate-500">
          Trusted by teams worldwide
        </h3>

        <div className="mt-10 flex flex-wrap justify-center gap-10 text-slate-400 font-semibold">
          {companies.map((company, index) => (
            <span key={index} className="text-lg">
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
