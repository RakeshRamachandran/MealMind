'use client'
import React, { useState } from 'react'
import MealPlanner from '../components/MealPlanner'
import Settings from '../components/Settings'

export default function Page() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/15 to-pink-500/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-white/90 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-8 min-h-screen flex flex-col">
        <header className="text-center mb-12 pt-8 relative">
          {/* Settings Icon - Top Right in Header */}
          <div className="absolute top-0 right-0">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105 border border-white/20"
              title="Settings"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* Enhanced Subtitle */}
          <p className="text-2xl text-gray-700 mt-3 font-semibold mb-2">
            Smart Meal & Grocery Planner
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            AI-powered meal suggestions tailored to your ingredients and preferences. 
            Transform your cooking experience with intelligent recipe recommendations.
          </p>
          
          {/* Decorative Elements */}
          <div className="flex justify-center mt-8 space-x-4">
            <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse animation-delay-200"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse animation-delay-400"></div>
          </div>
        </header>
        
        {/* Main Content */}
        <div className="flex-1">
          <MealPlanner />
        </div>
        
        {/* Footer */}
        <footer className="text-center mt-16 pb-8">
          <p className="text-gray-500 text-sm">
            Powered by AI • Made with ❤️ for food lovers
          </p>
        </footer>
      </div>

      {/* Settings Modal */}
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </main>
  )
}