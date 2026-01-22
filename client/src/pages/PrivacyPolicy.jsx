import React from "react";
import { 
  Shield, 
  Lock, 
  Database, 
  Eye, 
  Share2, 
  Cookie, 
  Users, 
  Mail, 
  ChevronRight, 
  CheckCircle,
  Key,
  Globe,
  Bell,
  Settings
} from "lucide-react";

const PrivacyPolicy = () => {
  const privacySections = [
    {
      icon: Database,
      title: "Information We Collect",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      bullets: [
        "Name, email address, and profile details",
        "Login credentials (stored securely and encrypted)",
        "Messages and collaboration content",
        "Transaction details for paid problems",
        "Technical data like IP address and browser type"
      ]
    },
    {
      icon: Settings,
      title: "How We Use Your Information",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      bullets: [
        "To create and manage your account",
        "To enable communication between users",
        "To process payments and rewards",
        "To improve platform features and performance",
        "To ensure safety and prevent misuse"
      ]
    },
    {
      icon: Share2,
      title: "Data Sharing",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      content: "We do not sell your personal data. Your information is only shared with trusted third-party services required to operate the platform (such as payment gateways and cloud storage providers)."
    },
    {
      icon: Lock,
      title: "Data Security",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
      content: "We use industry-standard security measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute protection."
    },
    {
      icon: Cookie,
      title: "Cookies & Tracking",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      content: "DevCollab may use cookies to enhance user experience, analyze traffic, and personalize content. You can disable cookies in your browser settings if you prefer."
    },
    {
      icon: Key,
      title: "Your Rights",
      color: "from-rose-500 to-red-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
      bullets: [
        "Access and update your personal data",
        "Request deletion of your account",
        "Withdraw consent for data usage"
      ]
    },
    {
      icon: Globe,
      title: "Third-Party Links",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-100",
      content: "Our platform may contain links to third-party websites. We are not responsible for their privacy practices or content."
    },
    {
      icon: Bell,
      title: "Changes to This Policy",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-100",
      content: "We may update this Privacy Policy occasionally. Continued use of the platform means you accept the revised policy."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Your privacy matters. Learn how we protect and handle your data.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 font-medium">Last updated: January 2026</span>
              </div>
              <div className="w-px h-4 bg-white/30"></div>
              <span className="text-white/70 text-sm">Version 2.1</span>
            </div>
          </div>
        </div>
        
        {/* Decorative curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-white" viewBox="0 0 1440 120" fill="currentColor">
            <path d="M0,0V120H1440V0C1440,0,1200,120,720,120S0,0,0,0Z" />
          </svg>
        </div>
      </div>

      {/* Introduction Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-x-20 -translate-y-20 opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full translate-x-20 translate-y-20 opacity-60"></div>
          
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Our Commitment to Privacy
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At <span className="font-bold text-blue-600">DevCollab</span>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform. We believe in transparency and giving you control over your data.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Secure by Design</p>
                  <p className="text-sm text-gray-600">End-to-end encryption</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">No Data Selling</p>
                  <p className="text-sm text-gray-600">We don't sell your data</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Your Control</p>
                  <p className="text-sm text-gray-600">Full data management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Principles Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {privacySections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div 
                key={index}
                className={`rounded-2xl border ${section.borderColor} ${section.bgColor} p-6 md:p-8 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {section.title}
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-white/50 text-gray-600 rounded-full border border-white/50">
                        {index + 1}
                      </span>
                    </div>
                    
                    {section.content && (
                      <p className="text-gray-700 leading-relaxed">
                        {section.content}
                      </p>
                    )}
                    
                    {section.bullets && (
                      <ul className="space-y-3 mt-4">
                        {section.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-0.5 flex-shrink-0">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${section.color}`}></div>
                            </div>
                            <span className="text-gray-700">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Privacy Principle</span>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 h-2 rounded-full bg-gradient-to-br ${section.color} ${i === 0 ? 'opacity-100' : i === 1 ? 'opacity-60' : 'opacity-30'}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Control Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg p-8 md:p-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-6">
              <Settings className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Control Your Data
            </h3>
            <p className="text-gray-600">
              You have full control over your personal information. Here's how you can manage it:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">View Your Data</h4>
              <p className="text-sm text-gray-600">
                Access all personal information we have about you through your account settings.
              </p>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Update Preferences</h4>
              <p className="text-sm text-gray-600">
                Modify your privacy settings and communication preferences anytime.
              </p>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-red-300 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                <Key className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Request Deletion</h4>
              <p className="text-sm text-gray-600">
                You can request complete deletion of your account and all associated data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full translate-x-32 -translate-y-32 opacity-40"></div>
          
          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Privacy Questions?
                  </h3>
                  <p className="text-gray-600 max-w-lg">
                    Our dedicated privacy team is here to help you understand how we protect your data.
                  </p>
                </div>
              </div>
              
              {/* <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:privacy@devcollab.app"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 group"
                >
                  Contact Privacy Team
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                  Download Policy
                </button>
              </div> */}
            </div>
            
            {/* <div className="mt-8 pt-8 border-t border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
                  <div className="p-2 bg-white rounded-lg border border-blue-100">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">For privacy concerns</p>
                    <a 
                      href="mailto:privacy@devcollab.app" 
                      className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      privacy@devcollab.app
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
                  <div className="p-2 bg-white rounded-lg border border-blue-100">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">For data access requests</p>
                    <a 
                      href="mailto:data-access@devcollab.app" 
                      className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      data-access@devcollab.app
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Compliance Banner */}
  

      {/* Footer */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
            <Shield className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600 font-medium">Your Privacy is Protected</span>
          </div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            © 2026 DevCollab. All rights reserved. This Privacy Policy outlines our commitment to protecting your personal information and ensuring transparency in our data practices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;