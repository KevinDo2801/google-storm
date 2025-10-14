import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleWeatherService } from '@/lib/google-weather-service';

interface ForecastDay {
  date: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
  windSpeed: number;
  humidity: number;
  isHurricaneRisk: boolean;
}

interface ForecastResponse {
  forecast: ForecastDay[];
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  lastUpdated: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat = '25.774', lng = '-80.193' } = req.query; // Default to Miami coordinates

  try {
    // Check if API key is configured
    if (!process.env.OPENWEATHER_API_KEY) {
      console.warn('OPENWEATHER_API_KEY not configured, using mock data');
      const mockData = getMockForecastData(parseFloat(lat as string), parseFloat(lng as string));
      
      const response: ForecastResponse = {
        forecast: mockData.forecast,
        location: mockData.location,
        lastUpdated: mockData.lastUpdated,
      };
      
      return res.status(200).json(response);
    }

    const googleWeatherService = GoogleWeatherService.getInstance();
    const forecastData = await googleWeatherService.getForecast(
      parseFloat(lat as string), 
      parseFloat(lng as string)
    );

    const response: ForecastResponse = {
      forecast: forecastData.forecast,
      location: forecastData.location,
      lastUpdated: forecastData.lastUpdated,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Forecast API error:', error);
    
    // Fallback to mock data on error
    const mockData = getMockForecastData(parseFloat(lat as string), parseFloat(lng as string));
    
    const response: ForecastResponse = {
      forecast: mockData.forecast,
      location: mockData.location,
      lastUpdated: mockData.lastUpdated,
    };
    
    res.status(200).json(response);
  }
}

function isHurricaneRisk(windSpeed: number, precipitation: number, date: string): boolean {
  // Simple heuristic for hurricane risk
  const isHurricaneSeason = new Date(date).getMonth() >= 5 && new Date(date).getMonth() <= 10;
  const highWindRisk = windSpeed > 25; // mph
  const highPrecipitationRisk = precipitation > 2; // inches
  
  return isHurricaneSeason && (highWindRisk || highPrecipitationRisk);
}

function getMockForecastData(lat: number, lng: number): ForecastResponse {
  const now = new Date();
  const forecast: ForecastDay[] = [];
  const isHurricaneSeason = now.getMonth() >= 5 && now.getMonth() <= 10;
  
  // Generate 5-day forecast
  for (let i = 0; i < 5; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    
    const baseTemp = 75 + Math.random() * 15; // 75-90°F
    const variation = Math.random() * 10 - 5; // ±5°F
    const windSpeed = Math.round(5 + Math.random() * 20); // 5-25 mph
    const precipitation = Math.random() * 3; // 0-3 inches
    
    const conditions = ['sunny', 'partly cloudy', 'cloudy', 'light rain', 'thunderstorms'];
    const condition = isHurricaneSeason 
      ? conditions[Math.floor(Math.random() * conditions.length)]
      : conditions[Math.floor(Math.random() * 3)]; // Less severe weather outside hurricane season
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      high: Math.round(baseTemp + variation + 5),
      low: Math.round(baseTemp + variation - 5),
      condition,
      precipitation: Math.round(precipitation * 100) / 100,
      windSpeed,
      humidity: Math.round(60 + Math.random() * 30), // 60-90%
      isHurricaneRisk: isHurricaneRisk(windSpeed, precipitation, date.toISOString()),
    });
  }
  
  return {
    forecast,
    location: {
      name: 'Miami',
      lat,
      lng,
    },
    lastUpdated: now.toISOString(),
  };
}

