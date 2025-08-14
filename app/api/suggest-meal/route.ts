import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SETTINGS_FILE = path.join(process.cwd(), 'settings.json')

// Get the current default prompt
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
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading settings:', error)
  }
  return { customPrompt: '', selectedModel: 'mistralai/mistral-small-3.2-24b-instruct:free' }
}

export async function POST(request: NextRequest) {
  try {
    const { fridge, preferences, timeAvailable } = await request.json()

    const items = (fridge || []).map((i: any) => i.name).join(', ')
    
    // Read settings
    const settings = readSettings()
    let prompt = settings.customPrompt || getCurrentDefaultPrompt()
    const selectedModel = settings.selectedModel || 'mistralai/mistral-small-3.2-24b-instruct:free'

    // Replace placeholders with actual values
    prompt = prompt
      .replace(/{ingredients}/g, items)
      .replace(/{preferences}/g, preferences)
      .replace(/{timeAvailable}/g, timeAvailable.toString())

    const apiKey = process.env.OPENROUTER_API_KEY || 'OPENROUTER_API_KEY'
    
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is not set')
    }
    
    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 100000) // 1 Min timeout
    
    try {
      const openrouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://mealmind.vercel.app',
          'X-Title': 'MealMind'
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { 
              role: 'system', 
              content: 'You are MealMind, a friendly and knowledgeable culinary AI assistant. You help users create delicious meals based on your available ingredients, dietary preferences, and time constraints. Always be encouraging, practical, and provide detailed, easy-to-follow instructions.' 
            }, 
            { 
              role: 'user', 
              content: prompt 
            }
          ],
          max_tokens: 2000, // Reduced from 1000 for faster response
          temperature: 0.7
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!openrouterRes.ok) {
        const errorText = await openrouterRes.text()
        throw new Error(`OpenRouter API error: ${openrouterRes.status} - ${errorText}`)
      }

      const json = await openrouterRes.json()
      const text = json?.choices?.[0]?.message?.content || 'Unable to generate suggestion at this time.'
      
      return NextResponse.json({ suggestion: text })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.')
      }
      throw fetchError
    }
  } catch (err) {
    console.error('API Error:', err)
    
    // Provide a fallback suggestion based on available ingredients
    try {
      const { fridge, timeAvailable } = await request.json()
      const items = (fridge || []).map((i: any) => i.name).join(', ')
      const fallbackSuggestion = `# Quick Meal Idea

Based on your available ingredients (${items}), here's a simple suggestion:

## Simple Stir-Fry
**Cooking Time:** ${timeAvailable || 30} minutes

### Ingredients:
- Your available ingredients: ${items}
- Basic seasonings (salt, pepper, oil)

### Instructions:
1. Heat oil in a pan over medium heat
2. Add your ingredients and stir-fry for 5-7 minutes
3. Season with salt and pepper to taste
4. Serve hot

*Note: This is a fallback suggestion. The AI service is currently unavailable, but you can still create a delicious meal with your available ingredients!*

### Tips:
- Adjust cooking time based on your ingredients
- Add herbs or spices if available
- Consider adding a protein source if you have any`

      return NextResponse.json(
        { 
          suggestion: fallbackSuggestion,
          error: 'AI service temporarily unavailable, showing fallback suggestion',
          details: err instanceof Error ? err.message : 'Unknown error'
        },
        { status: 200 } // Return 200 so the frontend still shows something
      )
    } catch (parseErr) {
      // If we can't even parse the request, return a generic fallback
      const genericSuggestion = `# Quick Meal Idea

## Simple Stir-Fry
**Cooking Time:** 30 minutes

### Instructions:
1. Heat oil in a pan over medium heat
2. Add your available ingredients and stir-fry for 5-7 minutes
3. Season with salt and pepper to taste
4. Serve hot

*Note: This is a fallback suggestion. The AI service is currently unavailable.*`

      return NextResponse.json(
        { 
          suggestion: genericSuggestion,
          error: 'AI service temporarily unavailable, showing fallback suggestion',
          details: err instanceof Error ? err.message : 'Unknown error'
        },
        { status: 200 }
      )
    }
  }
}
