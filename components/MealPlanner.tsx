'use client'
import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Ingredient = { name: string; qty?: string; expiresAt?: string }

export default function MealPlanner() {
  const [mounted, setMounted] = useState(false)
  const suggestionRef = useRef<HTMLDivElement>(null)
  const [fridge, setFridge] = useState<Ingredient[]>([
    { name: 'milk', qty: '1L', expiresAt: '' },
    { name: 'eggs', qty: '6', expiresAt: '' },
    { name: 'spinach', qty: '1 bunch', expiresAt: '' },
  ])
  const [preferences, setPreferences] = useState('vegetarian')
  const [timeAvailable, setTimeAvailable] = useState(30)
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [newIngredient, setNewIngredient] = useState('')
  const [newQuantity, setNewQuantity] = useState('')

  // Initialize mounted state after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading state during SSR/hydration
  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const handleSuggest = async () => {
    setLoading(true)
    try {
      const requestBody = { fridge, preferences, timeAvailable }
      
      // Create AbortController for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 35000) // 35 second timeout
      
      try {
        const res = await fetch('/api/suggest-meal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        
        if (!res.ok) {
          const errorText = await res.text()
          throw new Error(`API Error: ${res.status} - ${errorText}`)
        }
        
        const data = await res.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        setSuggestion(data.suggestion)
        
        // Scroll to suggestion section after a short delay to ensure the content is rendered
        setTimeout(() => {
          suggestionRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          })
        }, 100)
      } catch (fetchError) {
        clearTimeout(timeoutId)
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out. Please try again.')
        }
        throw fetchError
      }
    } catch (err) {
      console.error('Error in handleSuggest:', err)
      setSuggestion(`Could not fetch suggestion: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFridge([...fridge, { name: newIngredient.trim(), qty: newQuantity.trim(), expiresAt: '' }])
      setNewIngredient('')
      setNewQuantity('')
    }
  }

  // Function to clean up HTML tags in the suggestion
  const cleanSuggestion = (suggestion: string) => {
    return suggestion
      .replace(/<br\s*\/?>/gi, '\n') // Convert <br> tags to line breaks
      .replace(/<br\s*\/?>/gi, '\n') // Handle self-closing <br/>
      .replace(/<\/?[^>]+(>|$)/g, '') // Remove any other HTML tags
  }

  const removeIngredient = (index: number) => {
    setFridge(fridge.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Row - Fridge and Preferences */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Fridge Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 card-hover">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Your Fridge</h2>
              <p className="text-gray-600 text-sm">Available ingredients</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            {fridge.map((item, i) => (
              <div key={`${item.name}-${i}`} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border border-green-100">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-4 shadow-sm"></div>
                  <div>
                    <span className="font-semibold text-gray-800 capitalize text-lg">{item.name}</span>
                    {item.qty && <span className="text-gray-600 ml-2 text-sm">({item.qty})</span>}
                  </div>
                </div>
                <button
                  onClick={() => removeIngredient(i)}
                  className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                placeholder="Add ingredient..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl input-focus text-lg"
              />
              <input
                type="text"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                placeholder="Qty"
                className="w-24 px-4 py-3 border border-gray-300 rounded-2xl input-focus text-lg text-center"
              />
            </div>
            <button
              onClick={addIngredient}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              Add Ingredient
            </button>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 card-hover">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Preferences</h2>
              <p className="text-gray-600 text-sm">Your cooking style</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">Dietary Preference</label>
              <select 
                value={preferences} 
                onChange={(e) => setPreferences(e.target.value)} 
                className="w-full p-4 border border-gray-300 rounded-2xl input-focus bg-white text-lg font-medium"
              >
                <option value="vegetarian">🥬 Vegetarian</option>
                <option value="vegan">🌱 Vegan</option>
                <option value="keto">🥑 Keto</option>
                <option value="protein">🥩 Protein</option>
                <option value="omnivore">🍖 Omnivore</option>
                <option value="pescatarian">🐟 Pescatarian</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">Time Available</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={timeAvailable} 
                  onChange={(e) => setTimeAvailable(Number(e.target.value))} 
                  className="w-full p-4 border border-gray-300 rounded-2xl input-focus text-lg font-medium"
                  min="5"
                  max="180"
                />
                <span className="absolute right-4 top-4 text-gray-500 font-medium">minutes</span>
              </div>
            </div>

            <button 
              onClick={handleSuggest} 
              disabled={loading} 
              className="w-full py-4 px-6 button-primary flex items-center justify-center gap-3 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Thinking...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Get Meal Suggestion
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AI Suggestion Section - Full Width Below */}
      <div ref={suggestionRef} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 card-hover">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">AI Suggestion</h2>
            <p className="text-gray-600 text-sm">Your personalized recipe</p>
          </div>
        </div>

        <div className="min-h-[400px] p-6 border-2 border-dashed border-orange-200 rounded-2xl bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
          {suggestion ? (
            <div className="markdown-content animate-slide-up">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{cleanSuggestion(suggestion)}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-600 font-semibold text-xl mb-2">No suggestion yet</p>
              <p className="text-gray-500 text-lg">Click "Get Meal Suggestion" to start</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}