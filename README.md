# MealMind - Smart Meal & Grocery Planner

A beautiful, AI-powered meal planning application that suggests delicious recipes based on your available ingredients, dietary preferences, and time constraints.

## Features

- 🍽️ **Smart Meal Suggestions**: Get personalized recipe recommendations using AI
- 🥬 **Dietary Preferences**: Support for vegetarian, vegan, omnivore, and pescatarian diets
- ⏱️ **Time-Based Planning**: Filter recipes by available cooking time
- 🥘 **Ingredient Management**: Add and remove ingredients from your virtual fridge
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 🤖 **OpenRouter Integration**: Powered by advanced AI models

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenRouter.ai (GPT-4o-mini)
- **Database**: Supabase (ready for future features)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenRouter API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mealmind
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # OpenRouter API Key
   # Get your API key from: https://openrouter.ai/keys
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Get your OpenRouter API key**
   - Visit [OpenRouter.ai](https://openrouter.ai/keys)
   - Sign up for a free account
   - Create a new API key
   - Add it to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Add Ingredients**: Use the "Your Fridge" section to add ingredients you have available
2. **Set Preferences**: Choose your dietary preference and available cooking time
3. **Get Suggestions**: Click "Get Meal Suggestion" to receive AI-powered recipe recommendations
4. **Follow Instructions**: Use the detailed step-by-step instructions to cook your meal

## API Configuration

The app uses OpenRouter.ai to access various AI models. The current configuration uses:
- **Model**: `openai/gpt-4o-mini`
- **Max Tokens**: 1000
- **Temperature**: 0.7

You can modify these settings in `pages/api/suggest-meal.ts`.

## Project Structure

```
mealmind/
├── app/                    # Next.js 14 app directory
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   └── MealPlanner.tsx    # Main meal planner component
├── pages/                 # API routes
│   └── api/
│       └── suggest-meal.ts # AI suggestion endpoint
├── lib/                   # Utility libraries
│   └── supabaseClient.ts  # Supabase client (for future use)
└── styles/               # Global styles
    └── globals.css       # Tailwind CSS
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:
1. Check the [OpenRouter documentation](https://openrouter.ai/docs)
2. Review the console logs for error details
3. Ensure your API key is correctly set in `.env.local`

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Save favorite recipes
- [ ] Grocery list generation
- [ ] Recipe ratings and reviews
- [ ] Meal planning calendar
- [ ] Nutritional information
- [ ] Recipe sharing
- [ ] Mobile app
