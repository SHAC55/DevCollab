import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/notificationContext";
import {
  Bell,
  Check,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  XCircle,
  Info,
  AlertTriangle,
} from "lucide-react";

const Notify = () => {
  const { notifications, fetchNotifications, markAsRead, markAllAsRead } =
    useNotification();

  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true);
      await fetchNotifications();
      setIsLoading(false);
    };
    loadNotifications();
  }, []);

  const handleClick = async (notif) => {
    await markAsRead(notif._id);
    if (notif.link) navigate(notif.link);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === "unread") return !notif.isRead;
    if (activeFilter === "read") return notif.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const formatTime = (date) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffInHours = (now - notifDate) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours}h ago`;
    } else if (diffInHours < 168) {
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    }
    return notifDate.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_40%),linear-gradient(120deg,#f3ecff,#eef3ff,#ffffff)] px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Bell className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Notifications
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  {unreadCount > 0
                    ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                    : "All caught up!"}
                </p>
              </div>
            </div>

            {notifications.some((n) => !n.isRead) && (
              <button
                onClick={markAllAsRead}
                className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-sm hover:border-gray-300"
              >
                <Check className="w-4 h-4 text-gray-600 group-hover:text-indigo-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">
                  Mark all as read
                </span>
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {["all", "unread", "read"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                {filter === "unread" && unreadCount > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border p-4 animate-pulse"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              {activeFilter === "all"
                ? "You're all caught up! Check back later for updates."
                : activeFilter === "unread"
                  ? "No unread notifications at the moment."
                  : "No read notifications to show."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((n) => (
              <div
                key={n._id}
                onClick={() => handleClick(n)}
                className={`group bg-white rounded-xl border transition-all duration-300 hover:shadow-md hover:border-gray-300 cursor-pointer ${
                  !n.isRead
                    ? "border-l-4 border-l-indigo-500 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(n.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <p
                          className={`text-sm md:text-base ${
                            !n.isRead
                              ? "font-medium text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {n.text}
                        </p>
                        {n.link && (
                          <span className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
                            View <ExternalLink className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">
                          {formatTime(n.createdAt)}
                        </span>

                        <div className="flex items-center gap-2">
                          {!n.isRead && (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                              New
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {notifications.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Unread: {unreadCount}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  Read: {notifications.length - unreadCount}
                </span>
              </div>
              <div className="text-gray-500">
                Total: {notifications.length} notification
                {notifications.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notify;
