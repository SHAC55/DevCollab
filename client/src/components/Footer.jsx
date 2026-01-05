import React from "react";

const Footer = () => {
  return (
    <footer className="w-full px-6 py-16 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-white font-semibold text-lg">DevCollab</h3>
          <p className="mt-3 text-sm text-slate-400">
            Collaborate, build, and ship software faster.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li>Features</li>
            <li>Pricing</li>
            <li>Roadmap</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>Docs</li>
            <li>Blog</li>
            <li>Support</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

      </div>

      <div className="mt-12 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} DevCollab. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
