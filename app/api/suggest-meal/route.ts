import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('API route called')
    console.log('Environment variables check:')
    console.log('OPENROUTER_API_KEY exists:', !!process.env.OPENROUTER_API_KEY)
    console.log('OPENROUTER_API_KEY length:', process.env.OPENROUTER_API_KEY?.length || 0)
    
    const { fridge, preferences, timeAvailable } = await request.json()
    console.log('Request data:', { fridge, preferences, timeAvailable })

    const items = (fridge || []).map((i: any) => i.name).join(', ')
    const prompt = `You are MealMind, an AI culinary assistant. Based on the following ingredients and preferences, suggest a delicious meal idea:

Available Ingredients: ${items}
Dietary Preference: ${preferences}
Time Available: ${timeAvailable} minutes

Please provide a detailed meal suggestion that includes:
1. Recipe name
2. Brief description
3. Step-by-step instructions
4. Estimated cooking time
5  Make sure to suggest the meal based on the Dietary Preference
6. Tips for best results
7. Only suggest the meals with the available ingredients in the Fridge

Make sure the suggestion is practical, delicious, and fits within the time constraint. Be creative and encouraging!`

    console.log('Making request to OpenRouter with prompt:', prompt)
    
    const apiKey = process.env.OPENROUTER_API_KEY || 'Your-Open-router-api-key'
    
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is not set')
    }
    
    const openrouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://mealmind.vercel.app',
        'X-Title': 'MealMind'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b:free',
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
        max_tokens: 1000,
        temperature: 0.7
      }),
    })

    console.log('OpenRouter response status:', openrouterRes.status)

    if (!openrouterRes.ok) {
      const errorText = await openrouterRes.text()
      console.error('OpenRouter API error:', openrouterRes.status, errorText)
      throw new Error(`OpenRouter API error: ${openrouterRes.status} - ${errorText}`)
    }

    const json = await openrouterRes.json()
    const text = json?.choices?.[0]?.message?.content || 'Unable to generate suggestion at this time.'
    
    console.log('Successfully generated suggestion')
    console.log('Suggestion length:', text.length)
    return NextResponse.json({ suggestion: text })
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
