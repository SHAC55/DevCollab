import React from "react";

const Hero = () => {
  return (
    <section className="w-full flex justify-center px-6 py-10">
      {/* Outer Card */}
      <div className="relative w-full max-w-7xl rounded-[28px] overflow-hidden ">

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#f2eaff_0%,#e9ecff_35%,#eef6ff_60%,#ffffff_100%)]" />

        {/* Content */}
        <div className="relative z-10 px-10 py-20 md:px-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Headline */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              Collaborate & Build <br />
              Better Software <br />
              Faster
            </h1>

            {/* Right: Description + CTAs */}
            <div>
              <p className="text-lg text-slate-600 max-w-xl">
                Plan, collaborate, and ship code faster than ever with a
                modern workspace built for development teams.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="rounded-full bg-indigo-500 px-7 py-3 text-white font-medium shadow-md hover:bg-indigo-600 transition">
                  Get DevCollab for free
                </button>

                <button className="rounded-full border border-slate-300 bg-white px-7 py-3 text-slate-700 font-medium hover:bg-slate-100 transition">
                  Sign In
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
