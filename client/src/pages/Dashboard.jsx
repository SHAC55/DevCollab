import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  ChevronRight,
  BarChart3,
  Target,
  Award,
  PieChart,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Sparkles,
  Zap,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Share2,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

 

  // Dummy data
  const stats = [
    {
      title: "Total Problems Solved",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: CheckCircle,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      
    },
    {
      title: "In Progress",
      value: "8",
      change: "+3",
      trend: "up",
      icon: Clock,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Bids",
      value: "15",
      change: "-2",
      trend: "down",
      icon: DollarSign,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Manage Problems",
      value: "32",
      change: "+8%",
      trend: "up",
      icon: FileText,
      color: "bg-amber-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      route:'/manageproblems'
    },
  ];

  const recentProblems = [
    {
      id: 1,
      title: "E-commerce Website Bug Fix",
      category: "Web Development",
      status: "solved",
      date: "2 days ago",
      budget: "$500",
      priority: "high",
    },
    {
      id: 2,
      title: "Mobile App UI Redesign",
      category: "UI/UX Design",
      status: "in-progress",
      date: "1 week ago",
      budget: "$1200",
      priority: "medium",
    },
    {
      id: 3,
      title: "Database Optimization",
      category: "Backend",
      status: "pending",
      date: "3 days ago",
      budget: "$800",
      priority: "high",
    },
    {
      id: 4,
      title: "Payment Integration",
      category: "Fintech",
      status: "solved",
      date: "1 month ago",
      budget: "$950",
      priority: "low",
    },
  ];

  const bidStatusData = [
    { status: "Accepted", count: 8, color: "bg-emerald-500" },
    { status: "Pending", count: 5, color: "bg-amber-500" },
    { status: "Rejected", count: 2, color: "bg-red-500" },
    { status: "Expired", count: 1, color: "bg-gray-400" },
  ];

  const quickActions = [
    { title: "Post New Problem", icon: FileText, color: "bg-purple-100", iconColor: "text-purple-600" },
    { title: "Review Bids", icon: DollarSign, color: "bg-blue-100", iconColor: "text-blue-600" },
    { title: "Check Messages", icon: MessageSquare, color: "bg-emerald-100", iconColor: "text-emerald-600" },
    { title: "Analytics", icon: BarChart3, color: "bg-amber-100", iconColor: "text-amber-600" },
  ];

  const upcomingDeadlines = [
    { title: "Project Alpha Review", date: "Tomorrow", time: "2:00 PM" },
    { title: "Client Meeting", date: "Nov 15", time: "11:00 AM" },
    { title: "Bid Submission", date: "Nov 18", time: "5:00 PM" },
  ];

   const  navigate  =  useNavigate()

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_40%),linear-gradient(120deg,#f3ecff,#eef3ff,#ffffff)] min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex! 👋</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your projects today.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search problems..."
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              onClick={() => stat.route && navigate(stat.route)}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Problems & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Problems */}
            <div className="bg-white rounded-2xl border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Recent Problems</h2>
                      <p className="text-sm text-gray-600">Your active and solved projects</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {recentProblems.map((problem) => (
                    <div key={problem.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          problem.status === 'solved' ? 'bg-emerald-50' : 
                          problem.status === 'in-progress' ? 'bg-blue-50' : 'bg-amber-50'
                        }`}>
                          {problem.status === 'solved' && <CheckCircle className="w-6 h-6 text-emerald-600" />}
                          {problem.status === 'in-progress' && <Clock className="w-6 h-6 text-blue-600" />}
                          {problem.status === 'pending' && <AlertCircle className="w-6 h-6 text-amber-600" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{problem.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                              {problem.category}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              problem.priority === 'high' ? 'bg-red-100 text-red-700' :
                              problem.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {problem.priority} priority
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{problem.budget}</div>
                        <div className="text-sm text-gray-600">{problem.date}</div>
                        <div className="flex items-center gap-2 mt-2 justify-end">
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
                  >
                    <div className={`p-3 ${action.color} rounded-lg mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 text-center">{action.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Bid Status & Upcoming */}
          <div className="space-y-6">
            {/* Bid Status */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <PieChart className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Bid Status</h2>
                  <p className="text-sm text-gray-600">Overview of your bids</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {bidStatusData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">{item.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">{item.count}</span>
                      <span className="text-xs text-gray-500">bids</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>73%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
                    <p className="text-sm text-gray-600">Important dates to remember</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Add
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-900">{deadline.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Calendar className="w-4 h-4" />
                        {deadline.date} • {deadline.time}
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white rounded-lg">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Performance Score</h2>
                  <p className="text-sm text-purple-200">Based on project completion</p>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-5xl font-bold mb-2">8.6</div>
                <div className="text-sm text-purple-200">Excellent</div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-200">Completion Rate</span>
                <span className="font-semibold">92%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2 mb-4">
                <div className="bg-white h-2 rounded-full w-11/12"></div>
              </div>
              
              <button className="w-full py-2.5 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Tips & Updates */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">Pro Tip</h3>
            </div>
            <p className="text-gray-700">
              Review bids within 24 hours to increase acceptance rate by 30%.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Trending</h3>
            </div>
            <p className="text-gray-700">
              Mobile app development requests are up 45% this month.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-gray-900">Achievement</h3>
            </div>
            <p className="text-gray-700">
              You've solved 95% of problems on time this month!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;