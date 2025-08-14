import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Environment test',
    openrouterKeyExists: !!process.env.OPENROUTER_API_KEY,
    openrouterKeyLength: process.env.OPENROUTER_API_KEY?.length || 0,
    openrouterKeyPrefix: process.env.OPENROUTER_API_KEY?.substring(0, 10) || 'none',
    nodeEnv: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('OPENROUTER') || key.includes('OPENAI'))
  })
}
