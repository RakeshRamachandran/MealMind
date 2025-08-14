import React from 'react'
import MealPlanner from '../components/MealPlanner'

export default function Page() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/15 to-pink-500/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-white/90 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-8 min-h-screen flex flex-col">
        <header className="text-center mb-12 pt-8">
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
    </main>
  )
}