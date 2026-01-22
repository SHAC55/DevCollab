import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Bell } from "lucide-react";
import { useNotification } from "../context/notificationContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const { notifications } = useNotification();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-indigo-600" : "text-slate-600 hover:text-slate-900"
    }`;

  const isNotificationActive = location.pathname === "/notifications";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-indigo-600">
          DevCollab
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/explore" className={navLinkClass}>
            Explore
          </NavLink>

          <NavLink to="/post-problem" className={navLinkClass}>
            Post a Problem
          </NavLink>

          <NavLink to="/leaderboard" className={navLinkClass}>
            Leaderboard
          </NavLink>

          {/*  Notification Bell */}
          <Link to="/notifications" className="relative">
            <Bell
              className={`w-5 h-5 transition-colors ${
                isNotificationActive
                  ? "text-indigo-600"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* <NavLink to="/account" className={navLinkClass}>
            Account
          </NavLink> */}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-700 text-2xl"
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg border-t border-slate-200">
          <nav className="flex flex-col gap-4 px-6 py-6">
            <NavLink
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/explore"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Explore
            </NavLink>

            <NavLink
              to="/post-problem"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Post a Problem
            </NavLink>

            <NavLink
              to="/leaderboard"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Leaderboard
            </NavLink>

            <NavLink
              to="/notifications"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Notifications
            </NavLink>

            {/* <NavLink
              to="/account"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Account
            </NavLink> */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
