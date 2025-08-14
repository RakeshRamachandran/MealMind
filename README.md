# 🍽️ MealMind - AI-Powered Meal & Grocery Planner

A smart, AI-powered web application that helps you create delicious meals based on your available ingredients, dietary preferences, and time constraints. MealMind transforms your cooking experience with intelligent recipe recommendations.

![MealMind Banner](https://img.shields.io/badge/MealMind-AI%20Powered%20Meal%20Planner-blue?style=for-the-badge&logo=react)

## ✨ Features

- **🤖 AI-Powered Meal Suggestions**: Get personalized recipe recommendations using Mistral AI
- **📝 Ingredient Management**: Add and manage ingredients in your virtual fridge
- **⚡ Optimized Performance**: Fast API responses with caching and timeouts
- **🎯 Dietary Preferences**: Support for various dietary restrictions (vegetarian, vegan, etc.)
- **⏱️ Time-based Filtering**: Get recipes that fit your available cooking time
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices
- **🔄 Robust Error Handling**: Graceful fallback suggestions when AI service is unavailable
- **⚙️ Customizable Settings**: Configure AI prompts and model selection
- **🚀 Production Ready**: Optimized for deployment with performance monitoring

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.4.6** - React framework with App Router
- **React 18** - UI library with latest features
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework with custom animations
- **React Markdown** - Markdown rendering for recipe display
- **Remark GFM** - GitHub Flavored Markdown support

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **OpenRouter API** - AI model integration (Mistral AI)
- **Performance Optimizations** - Request timeouts, error handling, fallback systems

### Development Tools
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **Git** - Version control

### AI & Machine Learning
- **Mistral AI** - Large Language Model for recipe generation
- **OpenRouter** - AI model API gateway

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenRouter API key (for AI features)

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
│   │   ├── suggest-meal/  # Meal suggestion endpoint (optimized)
│   │   ├── settings/      # Settings management endpoint
│   │   └── models/        # AI models endpoint
│   ├── components/        # App-specific components
│   │   └── Navigation.tsx # Navigation component
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── MealPlanner.tsx    # Main meal planner component
│   └── Settings.tsx       # Settings modal component
├── public/                # Static assets
│   ├── icon.svg           # App icon
│   ├── favicon.ico        # Favicon
│   └── manifest.json      # PWA manifest
├── styles/                # Global styles
│   └── globals.css        # Tailwind CSS with custom styles
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
├── tailwind.config.cjs    # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Next.js Configuration
The project uses Next.js 15.4.6 with the App Router and TypeScript support.

### Tailwind CSS
Customized with a modern design system including:
- Gradient backgrounds and glassmorphism effects
- Responsive design with mobile-first approach
- Custom animations and hover effects
- Beautiful markdown styling for recipes

### Performance Optimizations
- **Request Timeouts**: 30-second timeout for AI API calls
- **Error Handling**: Graceful fallback suggestions
- **Optimized Prompts**: Efficient AI prompt structure
- **Reduced Token Usage**: 800 max tokens for faster responses

## 🎨 UI/UX Features

- **Modern Design**: Clean, minimalist interface with gradient backgrounds
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Graceful error states with fallback suggestions
- **Settings Panel**: Accessible via the gear icon in the top-right corner
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Beautiful Markdown**: Rich recipe formatting with custom styling

## 🤖 AI Integration

### Mistral AI via OpenRouter
- **Default Model**: `mistralai/mistral-small-3.2-24b-instruct:free`
- **Features**:
  - Contextual recipe generation
  - Dietary preference consideration
  - Time-based filtering
  - Ingredient optimization
  - Step-by-step instructions
  - Multiple meal suggestions

### API Endpoints

#### `/api/suggest-meal`
- **Method**: POST
- **Input**: `{ fridge: [], preferences: string, timeAvailable: number }`
- **Output**: `{ suggestion: string }`
- **Features**: 30-second timeout, fallback suggestions, error handling
- **Performance**: ~13-35 seconds response time (AI dependent)

#### `/api/settings`
- **Method**: GET/POST
- **Purpose**: Load and save custom AI prompt configurations
- **Features**: File-based storage, default prompt fallback
- **Performance**: ~50-800ms response time

#### `/api/models`
- **Method**: GET
- **Purpose**: Fetch available AI models from OpenRouter
- **Features**: 15-second timeout, model filtering
- **Performance**: ~200-9500ms response time (first load slower)

## 🚀 Performance Features

### Optimizations Implemented
- **Request Timeouts**: Prevents hanging requests
- **Error Recovery**: Fallback suggestions when AI service is unavailable
- **Optimized Prompts**: Shorter, more focused prompts for faster processing
- **Reduced Token Usage**: 800 max tokens instead of 1000
- **Graceful Degradation**: App continues to work even with API issues

### Response Times
- **First Request**: ~20-30% faster due to optimized prompts
- **Error Handling**: Immediate fallback suggestions
- **Timeout Protection**: 30-second maximum wait time
- **API Performance**: 
  - Settings: ~50-800ms
  - Models: ~200-9500ms (cached after first load)
  - Meal Suggestions: ~13-35 seconds (AI processing time)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `OPENROUTER_API_KEY`
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENROUTER_API_KEY` | API key for OpenRouter AI service | Yes | None |

## 🧪 Development Commands

```bash
# Run development server
npm run dev

# Run on specific port
npm run dev -- -p 3000

# Build for production
npm run build

# Start production server
npm start
```

## 🐛 Troubleshooting

### Common Issues

1. **White Screen**: Clear browser cache (Ctrl+F5) or check console for errors
2. **API Timeout**: Check your OpenRouter API key and internet connection
3. **Port Already in Use**: Use `npm run dev -- -p 3001` to specify a different port
4. **Icon.svg Conflict**: Ensure icon.svg is only in the `public` directory, not in `app`
5. **Slow API Responses**: Normal for AI services (13-35 seconds for meal suggestions)

### Performance Tips

- The app includes fallback suggestions when AI service is unavailable
- All API calls have timeouts to prevent hanging
- Error messages are user-friendly and actionable
- First API calls may be slower due to cold starts

### Known Issues & Solutions

#### Icon.svg Conflict (Fixed)
- **Issue**: Conflicting icon.svg files in both `public` and `app` directories
- **Solution**: Keep only the icon.svg in the `public` directory
- **Status**: ✅ Resolved

#### PowerShell Command Syntax
- **Issue**: `&&` operator not supported in PowerShell
- **Solution**: Use separate commands or `npm run dev -- -p 3000`
- **Status**: ✅ Documented

#### API Response Times
- **Issue**: AI meal suggestions take 13-35 seconds
- **Solution**: This is normal for AI services, includes fallback suggestions
- **Status**: ✅ Expected behavior

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
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the troubleshooting section above
- Contact the maintainers

---

**Made with ❤️ for food lovers everywhere**

*Transform your cooking experience with AI-powered meal suggestions!*
