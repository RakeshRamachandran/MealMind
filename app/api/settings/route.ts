import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SETTINGS_FILE = path.join(process.cwd(), 'settings.json')

// Ensure settings file exists
const ensureSettingsFile = () => {
  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify({
      customPrompt: '',
      selectedModel: 'mistralai/mistral-small-3.2-24b-instruct:free'
    }, null, 2))
  }
}

// Get the current default prompt (same as used in the suggest-meal API)
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

// Read settings from file
const readSettings = () => {
  ensureSettingsFile()
  
  try {
    const data = fs.readFileSync(SETTINGS_FILE, 'utf8')
    const settings = JSON.parse(data)
    // If no custom prompt is saved, return the current default prompt
    return {
      ...settings,
      customPrompt: settings.customPrompt || getCurrentDefaultPrompt(),
      selectedModel: settings.selectedModel || 'mistralai/mistral-small-3.2-24b-instruct:free'
    }
  } catch (error) {
    console.error('Error reading settings:', error)
    return { 
      customPrompt: getCurrentDefaultPrompt(),
      selectedModel: 'mistralai/mistral-small-3.2-24b-instruct:free'
    }
  }
}

// Write settings to file
const writeSettings = (settings: any) => {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2))
    return true
  } catch (error) {
    console.error('Error writing settings:', error)
    return false
  }
}

export async function GET() {
  try {
    const settings = readSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('GET settings error:', error)
    return NextResponse.json(
      { error: 'Failed to load settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customPrompt, selectedModel } = body

    const currentSettings = readSettings()
    const updatedSettings = {
      ...currentSettings,
      customPrompt: customPrompt || '',
      selectedModel: selectedModel || 'mistralai/mistral-small-3.2-24b-instruct:free'
    }

    const success = writeSettings(updatedSettings)
    
    if (success) {
      return NextResponse.json({ 
        message: 'Settings saved successfully',
        customPrompt: updatedSettings.customPrompt,
        selectedModel: updatedSettings.selectedModel
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to save settings' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('POST settings error:', error)
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    )
  }
}
