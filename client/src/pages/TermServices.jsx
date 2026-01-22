import React from "react";
import { Shield, Users, FileText, DollarSign, Award, Lock, AlertCircle, Mail, ChevronRight, CheckCircle } from "lucide-react";

const TermServices = () => {
  const terms = [
    {
      icon: Users,
      title: "Eligibility",
      content: "You must be at least 16 years old to use DevCollab. By using this platform, you confirm that the information you provide is accurate and complete."
    },
    {
      icon: Shield,
      title: "Platform Purpose",
      content: "DevCollab is a collaboration platform that connects problem owners with developers to solve technical challenges. We do not guarantee job placement, project success, or financial outcomes."
    },
    {
      icon: AlertCircle,
      title: "User Responsibilities",
      bullets: [
        "Provide accurate and truthful information",
        "Respect other users and maintain professional behavior",
        "Do not post illegal, harmful, or plagiarized content",
        "Do not misuse the platform for spam, scams, or misleading activities"
      ]
    },
    {
      icon: DollarSign,
      title: "Payments & Bounties",
      content: "Paid problems may include bounties or rewards. DevCollab is not responsible for disputes between users regarding payments, quality of work, or delivery timelines. All financial agreements are between the involved users."
    },
    {
      icon: Award,
      title: "Reputation & Ratings",
      content: "Ratings and reputation scores are provided by users. DevCollab does not verify the accuracy of reviews and is not liable for any reputation-related disputes."
    },
    {
      icon: FileText,
      title: "Content Ownership",
      content: "You retain ownership of the content you post. By posting on DevCollab, you grant us permission to display and distribute your content on the platform for operational purposes."
    },
    {
      icon: Lock,
      title: "Account Termination",
      content: "We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful activities without prior notice."
    },
    {
      icon: Shield,
      title: "Limitation of Liability",
      content: "DevCollab is provided on an 'as-is' basis. We are not responsible for any losses, damages, or disputes arising from the use of the platform."
    },
    {
      icon: FileText,
      title: "Changes to Terms",
      content: "We may update these Terms & Services at any time. Continued use of the platform after changes indicates acceptance of the new terms."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/20 to-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms & Services
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Understanding our platform guidelines and user agreements
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Last updated: January 2026
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="relative">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Welcome to <span className="font-bold text-indigo-600">DevCollab</span>. By accessing or using our platform, you agree to comply with and be bound by the following Terms and Services. If you do not agree with these terms, please do not use the platform.
            </p>
          </div>
        </div>
      </div>

      {/* Terms Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {terms.map((term, index) => {
            const Icon = term.icon;
            return (
              <div 
                key={index} 
                className="group bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {term.title}
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {index + 1}
                      </span>
                    </div>
                    
                    {term.content && (
                      <p className="text-gray-600 leading-relaxed">
                        {term.content}
                      </p>
                    )}
                    
                    {term.bullets && (
                      <ul className="space-y-3 mt-4">
                        {term.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full -translate-x-12 -translate-y-12 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full translate-x-12 translate-y-12 opacity-50"></div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Need Help?
                  </h3>
                  <p className="text-gray-600">
                    Have questions about our terms or need clarification?
                  </p>
                </div>
              </div>
{/*               
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:support@devcollab.app"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35 group"
                >
                  Contact Support
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                  Download PDF
                </button>
              </div> */}
            </div>
            
            <div className="mt-8 pt-8 border-t border-indigo-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-indigo-100">
                  <Mail className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email us at</p>
                  <a 
                    href="mailto:support@devcollab.app" 
                    className="text-lg font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    support@devcollab.app
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acceptance Banner */}
      {/* <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Accepting Our Terms
                </h4>
                <p className="text-gray-600">
                  By continuing to use DevCollab, you acknowledge that you have read, understood, and agree to be bound by these Terms & Services.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-700 font-medium">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Your continued use indicates acceptance
            </div>
          </div>
        </div>
      </div> */}

      {/* Footer Note */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            © 2026 DevCollab. All rights reserved. These Terms & Services constitute a legally binding agreement between you and DevCollab.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermServices;