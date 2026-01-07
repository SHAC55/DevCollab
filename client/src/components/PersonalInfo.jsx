import React from 'react'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Briefcase, 
  User,
  ExternalLink,
  Edit,
  LogOut,
  Settings,
  Shield
} from 'lucide-react'

const PersonalInfo = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/sign-in') // Redirect to login page after logout
  }

  const socialLinks = [
    {
      name: 'GitHub',
      url: user?.github,
      icon: <Github size={20} />,
      color: 'bg-gray-800 hover:bg-gray-900'
    },
    {
      name: 'LinkedIn',
      url: user?.linkedin,
      icon: <Linkedin size={20} />,
      color: 'bg-blue-600 hover:bg-blue-700'
    }
  ]

  const userInfo = [
    {
      label: 'Email',
      value: user?.email,
      icon: <Mail size={18} />
    },
    {
      label: 'Profession',
      value: user?.profession,
      icon: <Briefcase size={18} />
    },
    {
      label: 'Username',
      value: user?.username,
      icon: <User size={18} />
    }
  ]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Logout Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile Information</h1>
            <p className="text-gray-600 mt-2">View and manage your personal details</p>
          </div>
          
          {/* <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            <LogOut size={18} />
            Logout
          </button> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md">
                    <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
                      <div className="flex items-center gap-2 mt-2">
                        <Briefcase size={18} className="text-gray-500" />
                        <span className="text-gray-700 font-medium">{user?.profession}</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      <Shield size={14} />
                      Verified
                    </span>
                  </div>
                  <p className="text-gray-600 mt-3 max-w-2xl">
                    Professional profile information and social links. Keep your details updated for better networking.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-8"></div>

              {/* Personal Information */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <User size={20} />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userInfo.map((info, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-gray-600">
                          {info.icon}
                        </div>
                        <span className="text-sm text-gray-600">{info.label}</span>
                      </div>
                      <p className="text-gray-900 font-medium pl-9">
                        {info.value || 'Not specified'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <ExternalLink size={20} />
                  Professional Links
                </h3>
                
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link, index) => (
                    link.url && (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${link.color} text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg`}
                      >
                        {link.icon}
                        <span className="font-medium">{link.name}</span>
                        <ExternalLink size={16} className="ml-1" />
                      </a>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Status</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Profile Completeness</span>
                    <span className="text-sm font-medium text-blue-600">85%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium">2 days ago</span>
                  </div>
                  {/* <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">2023</span>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Actions Card - Now includes logout button */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Settings size={20} />
                Account Actions
              </h3>
              
              <div className="space-y-3">
                {/* <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
                  <Edit size={18} />
                  Edit Profile
                </button> */}
                
                <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Mail size={18} />
                  Contact Support
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full border-2 border-red-200 text-red-600 bg-red-50 py-3 px-4 rounded-xl font-medium hover:bg-red-100 hover:border-red-300 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Logout Account
                </button>
              </div>
            </div>

            {/* Security Tips Card */}
            {/* <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield size={20} />
                Security Notice
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Always logout from your account when using public or shared computers to protect your personal information.
              </p>
              <div className="text-xs text-gray-600 flex items-center gap-1">
                <Shield size={12} />
                Last login: Today, 10:30 AM
              </div>
            </div> */}
          </div>
        </div>

        {/* Mobile Floating Logout Button (for better UX on mobile) */}
        <div className="lg:hidden fixed bottom-6 right-6 z-10">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-110"
            title="Logout"
          >
            <LogOut size={22} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo