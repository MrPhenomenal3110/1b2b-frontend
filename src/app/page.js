"use client";

import {
  ChromeIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <section id="hero" className="relative min-h-screen w-full bg-[#1A1B25]">
        {/* Retro Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,#1A1B25_1px),linear-gradient(90deg,transparent_1px,#1A1B25_1px)] bg-[size:30px_30px] opacity-20"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-[#FFA500] to-[#FF7F00] bg-clip-text text-transparent">
                <img
                  src="/logo.png"
                  alt="A"
                  className="size-20 mb-5 -mr-2 inline-block"
                />
                dVantage
              </span>
              <br />
              Your Ad Analytics Platform
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
              Get deeper insights into your ad performance with our powerful
              analytics platform.
            </p>
            <a
              href="/analyze"
              className="inline-block px-12 py-6 text-xl bg-gradient-to-r from-[#FFA500] to-[#FF7F00] text-white rounded-lg hover:opacity-90 transition-opacity duration-200 font-medium"
            >
              Start Analyzing
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#1A1B25] to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#800020] rounded-full filter blur-[128px] opacity-20"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FF4500] rounded-full filter blur-[128px] opacity-20"></div>
      </section>

      <section id="features" className="relative w-full bg-[#1A1B25] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            <span className="bg-gradient-to-r from-[#FFA500] to-[#FF7F00] bg-clip-text text-transparent">
              Key Features
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1A1B25]/80 p-6 rounded-lg border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FFA500] to-[#FF7F00] rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Real-time Analytics
              </h3>
              <p className="text-white/70">
                Monitor your ad performance as it happens with live data
                updates.
              </p>
            </div>
            <div className="bg-[#1A1B25]/80 p-6 rounded-lg border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FFA500] to-[#FF7F00] rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Smart Insights
              </h3>
              <p className="text-white/70">
                AI-powered recommendations to optimize your campaigns.
              </p>
            </div>
            <div className="bg-[#1A1B25]/80 p-6 rounded-lg border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FFA500] to-[#FF7F00] rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Custom Dashboards
              </h3>
              <p className="text-white/70">
                Build and customize your analytics views.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="platforms" className="relative w-full bg-[#1A1B25] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            <span className="bg-gradient-to-r from-[#FFA500] to-[#FF7F00] bg-clip-text text-transparent">
              Supported Platforms
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="bg-[#1A1B25]/50 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center hover:border-[#007FFF] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#007FFF]/10 group">
              <div className="mb-4 w-16 h-16 mx-auto bg-gradient-to-br from-[#FFA500]/10 to-[#FF7F00]/10 rounded-xl p-4 group-hover:from-[#FFA500]/20 group-hover:to-[#FF7F00]/20 transition-colors duration-300">
                <FacebookIcon className="w-full h-full text-white/70 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Meta</h3>
              <p className="text-white/70">Facebook Ads Analytics</p>
            </div>
            <div className="bg-[#1A1B25]/50 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center hover:border-[#007FFF] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#007FFF]/10 group">
              <div className="mb-4 w-16 h-16 mx-auto bg-gradient-to-br from-[#FFA500]/10 to-[#FF7F00]/10 rounded-xl p-4 group-hover:from-[#FFA500]/20 group-hover:to-[#FF7F00]/20 transition-colors duration-300">
                <ChromeIcon className="w-full h-full text-white/70 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Google</h3>
              <p className="text-white/70">Google Ads Insights</p>
            </div>
            <div className="bg-[#1A1B25]/50 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center hover:border-[#007FFF] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#007FFF]/10 group">
              <div className="mb-4 w-16 h-16 mx-auto bg-gradient-to-br from-[#FFA500]/10 to-[#FF7F00]/10 rounded-xl p-4 group-hover:from-[#FFA500]/20 group-hover:to-[#FF7F00]/20 transition-colors duration-300">
                <LinkedinIcon className="w-full h-full text-white/70 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                LinkedIn
              </h3>
              <p className="text-white/70">Professional Ad Metrics</p>
            </div>
            <div className="bg-[#1A1B25]/50 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center hover:border-[#007FFF] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#007FFF]/10 group">
              <div className="mb-4 w-16 h-16 mx-auto bg-gradient-to-br from-[#FFA500]/10 to-[#FF7F00]/10 rounded-xl p-4 group-hover:from-[#FFA500]/20 group-hover:to-[#FF7F00]/20 transition-colors duration-300">
                <InstagramIcon className="w-full h-full text-white/70 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Instagram
              </h3>
              <p className="text-white/70">Visual Ad Analytics</p>
            </div>
            <div className="bg-[#1A1B25]/50 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center hover:border-[#007FFF] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#007FFF]/10 group">
              <div className="mb-4 w-16 h-16 mx-auto bg-gradient-to-br from-[#FFA500]/10 to-[#FF7F00]/10 rounded-xl p-4 group-hover:from-[#FFA500]/20 group-hover:to-[#FF7F00]/20 transition-colors duration-300">
                <TwitterIcon className="w-full h-full text-white/70 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Twitter</h3>
              <p className="text-white/70">Social Ad Performance</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
