# 🍽️ MealMind - AI-Powered Meal & Grocery Planner

A smart, AI-powered web application that helps you create delicious meals based on your available ingredients, dietary preferences, and time constraints. MealMind transforms your cooking experience with intelligent recipe recommendations.

![MealMind Banner](https://img.shields.io/badge/MealMind-AI%20Powered%20Meal%20Planner-blue?style=for-the-badge&logo=react)

## ✨ Features

- **🤖 AI-Powered Meal Suggestions**: Get personalized recipe recommendations using Mistral AI
- **📝 Ingredient Management**: Add and manage ingredients in your virtual fridge
- **⚡ Real-time Suggestions**: Instant meal ideas based on available ingredients
- **🎯 Dietary Preferences**: Support for various dietary restrictions (vegetarian, vegan, etc.)
- **⏱️ Time-based Filtering**: Get recipes that fit your available cooking time
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices
- **🔄 Fallback System**: Graceful error handling with backup suggestions
- **💾 Data Persistence**: Supabase integration for data storage (ready for implementation)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with latest features
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **React Markdown** - Markdown rendering for recipe display
- **Remark GFM** - GitHub Flavored Markdown support

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **OpenRouter API** - AI model integration (Mistral AI)
- **Axios** - HTTP client for API requests

### Database & Storage
- **Supabase** - Backend-as-a-Service (BaaS) with PostgreSQL
- **Supabase JS Client** - Database client integration

### Development Tools
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **ESLint** - Code linting (Next.js default)
- **Git** - Version control

### AI & Machine Learning
- **Mistral AI** - Large Language Model for recipe generation
- **OpenRouter** - AI model API gateway

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenRouter API key (for AI features)
- Supabase account (optional, for data persistence)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mealmind.git
   cd mealmind
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # AI Integration
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   
   # Database (Optional)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mealmind/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── suggest-meal/  # Meal suggestion endpoint
│   ├── components/        # App-specific components
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   └── MealPlanner.tsx    # Main meal planner component
├── lib/                   # Utility libraries
│   └── supabaseClient.ts  # Supabase client configuration
├── public/                # Static assets
├── styles/                # Global styles
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
├── tailwind.config.cjs    # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Next.js Configuration
The project uses Next.js 14 with the App Router and TypeScript support.

### Tailwind CSS
Customized with a modern design system including:
- Gradient backgrounds
- Glassmorphism effects
- Responsive design
- Custom animations

### TypeScript
Strict type checking enabled with:
- Strict null checks
- ES2017 target
- Next.js plugin integration

## 🎨 UI/UX Features

- **Modern Design**: Clean, minimalist interface with gradient backgrounds
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Graceful error states with fallback suggestions
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🤖 AI Integration

### Mistral AI via OpenRouter
- **Model**: `mistralai/mistral-small-3.2-24b-instruct:free`
- **Features**:
  - Contextual recipe generation
  - Dietary preference consideration
  - Time-based filtering
  - Ingredient optimization
  - Step-by-step instructions

### API Endpoint
- **Route**: `/api/suggest-meal`
- **Method**: POST
- **Input**: Ingredients, preferences, time available
- **Output**: Detailed recipe suggestions in Markdown format

## 📊 Database Schema (Supabase)

Ready for implementation with the following structure:

```sql
-- Ingredients table
CREATE TABLE ingredients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  quantity TEXT,
  expires_at DATE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences table
CREATE TABLE user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  dietary_preference TEXT,
  cooking_time_preference INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | API key for OpenRouter AI service | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | No |

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mistral AI** for providing the language model
- **OpenRouter** for AI model access
- **Supabase** for backend services
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with ❤️ for food lovers everywhere**

*Transform your cooking experience with AI-powered meal suggestions!*
