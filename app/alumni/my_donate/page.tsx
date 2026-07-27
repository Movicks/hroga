import React from 'react'

export default function MyDonations() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 text-center">
      {/* Icon */}
      <div className="text-7xl mb-6 animate-bounce">
        🚧
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-3">
        Coming Soon
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-600 max-w-md mb-8 leading-relaxed">
        We're working hard to bring you the 
        <span className="font-semibold text-indigo-600"> Manage My Donations </span>
        feature. Stay tuned for updates!
      </p>

      {/* Decorative line */}
      <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-8" />

      {/* Status indicator */}
      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
        </span>
        <span className="text-sm font-medium text-gray-600">
          In Development
        </span>
      </div>

      {/* Optional: Estimated time */}
      <p className="text-sm text-gray-400 mt-6">
        🚀 Launching soon • Q4 2026
      </p>
    </div>
  )
}