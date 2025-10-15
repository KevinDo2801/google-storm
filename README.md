# Storm - Emergency Resource Locator & Hurricane Tracker

A Next.js web application designed to help people locate critical resources during emergencies and natural disasters, with a focus on hurricane preparedness and real-time weather monitoring.

![Storm App](public/placeholder.jpg)

## 🌟 Features

### 🗺️ Interactive Resource Mapping
- **Emergency Shelters** - Find nearby evacuation centers and safe havens
- **Food Banks** - Locate food assistance programs
- **Medical Clinics** - Find healthcare facilities
- **Emergency Services** - Quick access to police and fire stations
- Real-time location tracking and distance calculations
- Google Maps integration with custom markers

### 🌀 Hurricane Tracking
- Live hurricane position tracking from NOAA/NHC data feeds
- Historical storm path visualization
- 5-day forecast cone projections
- Storm category classification (1-5)
- Wind speed and pressure readings
- Multi-basin support (Atlantic, Pacific, etc.)

### ⛈️ Weather Monitoring
- Real-time weather alerts and warnings
- Severe weather notifications (extreme/severe/moderate/minor)
- Current conditions (temperature, humidity, wind, pressure)
- 5-day weather forecast
- Smart notification system with intelligent alert prioritization
- Weather-based safety recommendations

### 👥 Crowd Density Analysis
- Population density heatmaps
- Crowding risk assessment
- Evacuation route optimization
- Social distancing zone identification

### 💬 AI-Powered Chat Interface
- Natural language query processing using Google Gemini AI
- Intent recognition for emergency situations
- Context-aware resource recommendations
- Emergency mode with priority filtering

### 🚨 Emergency Mode
- One-click emergency activation
- Instant access to critical services
- Prioritized shelter and emergency service display
- Enhanced notification system

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Maps**: Google Maps API
- **AI**: Google Generative AI (Gemini)
- **Weather Data**: AccuWeather API, OpenWeather API
- **Hurricane Data**: NOAA/NHC RSS feeds
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- npm or yarn package manager

You'll also need API keys for:
- Google Maps JavaScript API
- Google Gemini AI API
- AccuWeather API (optional, for enhanced weather data)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd storm
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Google Gemini AI API Key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key

# AccuWeather API Key (optional)
ACCUWEATHER_API_KEY=your_accuweather_api_key

# OpenWeather API Key (optional)
OPENWEATHER_API_KEY=your_openweather_api_key
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
storm/
├── app/                      # Next.js app router
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page component
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── chat-panel.tsx       # AI chat interface
│   ├── map-panel.tsx        # Interactive map
│   ├── weather-alert-banner.tsx
│   └── crowd-density-panel.tsx
├── lib/                     # Utility libraries
│   ├── hurricane-service.ts
│   ├── weather-service.ts
│   ├── smart-weather-notification-service.ts
│   └── utils.ts
├── pages/api/              # API routes
│   ├── places.ts           # Resource search
│   ├── hurricanes.ts       # Hurricane data
│   ├── intent.ts           # AI intent processing
│   └── weather/            # Weather endpoints
│       ├── alerts.ts
│       ├── current.ts
│       └── forecast.ts
├── public/                 # Static assets
│   └── data/              # Seed data
└── hooks/                 # Custom React hooks
```

## 🔑 API Keys Setup

### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials (API Key)
5. Add the key to `.env.local`

### Google Gemini AI
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add to `.env.local`

### AccuWeather (Optional)
1. Sign up at [AccuWeather API](https://developer.accuweather.com/)
2. Get your API key
3. Add to `.env.local`

## 🎯 Usage

### Finding Emergency Resources

1. **Using Quick Filters**: Click the "Shelters", "Food Banks", or "Clinics" buttons in the header
2. **Using Chat**: Type natural language queries like:
   - "Find shelters near me"
   - "Where can I get food?"
   - "I need medical help"
3. **Emergency Mode**: Toggle the emergency button for instant access to critical services

### Tracking Hurricanes

1. Enable "Hurricane Mode" in the chat panel
2. View active storms on the map
3. See forecast paths and intensity predictions
4. Get real-time updates as storms develop

### Weather Alerts

1. Allow location access when prompted
2. Receive automatic notifications for severe weather
3. View detailed alerts in the weather panel
4. Follow safety recommendations

### Crowd Density

1. Toggle "Show Crowd Density" in the chat panel
2. View population heatmaps
3. Identify high-traffic areas to avoid
4. Plan safer evacuation routes

## 🧪 Development

### Adding New Resource Types

1. Add the type to `MapMarker` interface in `app/page.tsx`
2. Create a new API endpoint in `pages/api/`
3. Update the UI filters in the header
4. Add corresponding markers to the map

### Modifying Weather Sources

Weather data is fetched from multiple sources with fallback support:
- Edit `lib/enhanced-weather-service.ts` for custom data sources
- Update alert parsing in `lib/weather-service.ts`

### Customizing AI Behavior

The AI intent recognition can be customized in:
- `pages/api/intent.ts` - Intent classification logic
- Add new categories and patterns as needed

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **NOAA/NHC** - Hurricane tracking data
- **Google Maps** - Mapping and geocoding services
- **Google Gemini** - AI-powered chat
- **shadcn/ui** - Beautiful UI components
- **Radix UI** - Accessible component primitives

## 🐛 Known Issues

- Hurricane data requires active storms during hurricane season
- Some weather APIs have rate limits on free tiers
- Mock data is used when live data is unavailable

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review API provider documentation for API-related issues

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Offline mode with cached data
- [ ] Push notifications
- [ ] User accounts and saved locations
- [ ] Community-sourced resource verification
- [ ] Mobile app (React Native)
- [ ] SMS alerts integration
- [ ] Evacuation route planning

## 💡 Tips

- **Performance**: The app caches weather and hurricane data to minimize API calls
- **Privacy**: Location data is only used client-side and not stored
- **Accuracy**: Resource data is sourced from Google Places and community databases
- **Updates**: Weather alerts refresh every 5 minutes, hurricanes every 15 minutes

---

**Built with ❤️ for emergency preparedness and community safety**

