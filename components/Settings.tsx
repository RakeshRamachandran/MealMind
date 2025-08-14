'use client'
import React, { useState, useEffect } from 'react'

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
}

// Get the current default prompt (same as used in the API)
const getCurrentDefaultPrompt = () => {
  return `You are MealMind, an AI culinary assistant. Based on the following ingredients and preferences, suggest a delicious meal idea:

Available Ingredients: {ingredients}
Dietary Preference: {preferences}
Time Available: {timeAvailable} minutes

Please provide a detailed meal suggestion that includes:
1. Recipe name
2. Brief description
3. Step-by-step instructions
4. Estimated cooking time
5. Make sure to suggest the meal based on the Dietary Preference
6. Tips for best results
7. Only suggest the meals with the available ingredients in the Fridge
8. Try to give more than 1 meal suggestion

Make sure the suggestion is practical, delicious, and fits within the time constraint. Be creative and encouraging!`
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('prompt')
  const [customPrompt, setCustomPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState('mistralai/mistral-small-3.2-24b-instruct:free')
  const [availableModels, setAvailableModels] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (isOpen) {
      loadSettings()
      loadModels()
    }
  }, [isOpen])

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        // If no custom prompt is saved, use the current default prompt
        setCustomPrompt(data.customPrompt || getCurrentDefaultPrompt())
        setSelectedModel(data.selectedModel || 'mistralai/mistral-small-3.2-24b-instruct:free')
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
      // Fallback to current default prompt if API fails
      setCustomPrompt(getCurrentDefaultPrompt())
      setSelectedModel('mistralai/mistral-small-3.2-24b-instruct:free')
    }
  }

  const loadModels = async () => {
    try {
      const response = await fetch('/api/models')
      if (response.ok) {
        const data = await response.json()
        setAvailableModels(data.models || [])
      }
    } catch (error) {
      console.error('Failed to load models:', error)
      setAvailableModels([])
    }
  }

  const saveSettings = async () => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customPrompt,
          selectedModel,
        }),
      })

      if (response.ok) {
        setMessage('Settings saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to save settings')
      }
    } catch (error) {
      setMessage('Error saving settings')
    } finally {
      setIsLoading(false)
    }
  }

  const resetToDefault = () => {
    const defaultPrompt = getCurrentDefaultPrompt()
    setCustomPrompt(defaultPrompt)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-6 pt-6 pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Settings</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('prompt')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'prompt'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Prompt Configuration
                </button>
                <button
                  onClick={() => setActiveTab('models')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'models'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Models
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'prompt' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-lg font-semibold text-gray-700">
                      Custom AI Prompt
                    </label>
                                         <button
                       onClick={resetToDefault}
                       className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                     >
                       Reset to Current Default
                     </button>
                  </div>
                                     <p className="text-sm text-gray-600 mb-4">
                     Customize the prompt used by the AI to generate meal suggestions. The current default prompt is shown below. Use placeholders like {'{ingredients}'}, {'{preferences}'}, and {'{timeAvailable}'} to include dynamic content.
                   </p>
                   <textarea
                     value={customPrompt}
                     onChange={(e) => setCustomPrompt(e.target.value)}
                     rows={15}
                     className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none font-mono text-sm"
                     placeholder="The current default prompt will be shown here..."
                   />
                </div>

                {/* Placeholder Guide */}
                <div className="bg-gray-50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Available Placeholders:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center">
                      <code className="bg-white px-2 py-1 rounded text-indigo-600 font-mono">{'{ingredients}'}</code>
                      <span className="ml-2 text-gray-600">Available ingredients</span>
                    </div>
                    <div className="flex items-center">
                      <code className="bg-white px-2 py-1 rounded text-indigo-600 font-mono">{'{preferences}'}</code>
                      <span className="ml-2 text-gray-600">Dietary preferences</span>
                    </div>
                    <div className="flex items-center">
                      <code className="bg-white px-2 py-1 rounded text-indigo-600 font-mono">{'{timeAvailable}'}</code>
                      <span className="ml-2 text-gray-600">Time available</span>
                    </div>
                  </div>
                </div>

                {message && (
                  <div className={`p-3 rounded-lg text-sm ${
                    message.includes('successfully') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {message}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'models' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    AI Model Selection
                  </label>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose the AI model that will generate your meal suggestions. Different models may provide varying quality and response times.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selected Model
                      </label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {availableModels.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedModel && (
                      <div className="bg-gray-50 rounded-2xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Model Details:</h4>
                        {(() => {
                          const model = availableModels.find(m => m.id === selectedModel)
                          return model ? (
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Name:</span> {model.name}
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Context Length:</span> {model.context_length?.toLocaleString()} tokens
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Pricing:</span> ${model.pricing?.prompt}/1K input, ${model.pricing?.completion}/1K output
                              </div>
                              {model.description && (
                                <div>
                                  <span className="font-medium text-gray-700">Description:</span>
                                  <p className="text-gray-600 mt-1">{model.description}</p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-600">Loading model details...</p>
                          )
                        })()}
                      </div>
                    )}
                  </div>

                  {message && (
                    <div className={`p-3 rounded-lg text-sm ${
                      message.includes('successfully') 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {message}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveSettings}
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
