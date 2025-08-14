import React from 'react'
import type { Metadata } from 'next'
import '../styles/globals.css'
import Navigation from './components/Navigation'

export const metadata: Metadata = {
  title: 'MealMind - Smart Meal & Grocery Planner',
  description: 'AI-powered meal suggestions tailored to your ingredients and preferences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col text-gray-900">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
