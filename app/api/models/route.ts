import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY || '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'
    
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is not set')
    }

    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

    try {
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://mealmind.vercel.app',
          'X-Title': 'MealMind'
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`)
      }

      const data = await response.json()
      
      // Filter and format the models for the UI
      const models = data.data
        .filter((model: any) => 
          // Only include text models (no image models for now)
          model.architecture?.modality === 'text->text' ||
          model.architecture?.modality === 'text+image->text'
        )
        .map((model: any) => ({
          id: model.id,
          name: model.name,
          description: model.description,
          context_length: model.context_length,
          pricing: model.pricing
        }))
        .sort((a: any, b: any) => {
          // Sort by name for better UX
          return a.name.localeCompare(b.name)
        })

      return NextResponse.json({ models })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.')
      }
      throw fetchError
    }
  } catch (error) {
    console.error('Error fetching models:', error)
    return NextResponse.json(
      { error: 'Failed to fetch models', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
