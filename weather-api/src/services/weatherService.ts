interface WeatherData {
  date: string;
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
  averageTemperature: number;
  wind: number; // km/h
  gusts: number; // km/h
  precipitation: number; // mm
  condition: string;
  description: string;
}

const descriptions = {
  Sunny: 'Clear skies and warm temperatures.',
  Cloudy: 'Overcast skies with mild temperatures.',
  Rainy: 'Showers expected throughout the day.',
  Snowy: 'Snowy weather, please bundle up!',
  Windy: 'Breezy with gusts of wind.',
};

const getSeason = (month: number): string => {
  if (month === 12 || month === 1 || month === 2) return 'Winter';
  if (month >= 3 && month <= 5) return 'Spring';
  if (month >= 6 && month <= 8) return 'Summer';
  return 'Fall';
};

const generateWeatherForDate = (date: string): WeatherData => {
  const month = new Date(date).getMonth() + 1; // Months are 0-based, so add 1
  const season = getSeason(month);
  const temperature = generateTemperature(season);
  const minTemperature = temperature - Math.floor(Math.random() * 5); // Slightly lower than temperature
  const maxTemperature = temperature + Math.floor(Math.random() * 5); // Slightly higher than temperature
  const averageTemperature = Math.round((minTemperature + maxTemperature) / 2);
  const wind = generateWindSpeed(season);
  const gusts = wind + Math.floor(Math.random() * 10); // Higher than wind
  const precipitation = generatePrecipitation(season, temperature);
  const condition = getWeatherCondition(temperature, season, precipitation);
  const description = descriptions[condition];

  return {
    date,
    temperature,
    minTemperature,
    maxTemperature,
    averageTemperature,
    wind,
    gusts,
    precipitation,
    condition,
    description,
  };
};

const generateTemperature = (season: string): number => {
  switch (season) {
    case 'Winter':
      return Math.floor(Math.random() * 16) - 10; // -10°C to 5°C
    case 'Spring':
      return Math.floor(Math.random() * 16) + 5;  // 5°C to 20°C
    case 'Summer':
      return Math.floor(Math.random() * 16) + 20; // 20°C to 35°C
    case 'Fall':
      return Math.floor(Math.random() * 16) + 5;  // 5°C to 20°C
    default:
      return 0;
  }
};

const generateWindSpeed = (season: string): number => {
  switch (season) {
    case 'Winter':
      return Math.floor(Math.random() * 21) + 10; // 10–30 km/h
    case 'Spring':
      return Math.floor(Math.random() * 16) + 5;  // 5–20 km/h
    case 'Summer':
      return Math.floor(Math.random() * 11) + 0;  // 0–10 km/h
    case 'Fall':
      return Math.floor(Math.random() * 16) + 5;  // 5–20 km/h
    default:
      return 0;
  }
};

const generatePrecipitation = (season: string, temperature: number): number => {
  if (temperature > 0) {
    return Math.random() < 0.3 ? Math.floor(Math.random() * 21) : 0; // 30% chance of rain (0–20 mm)
  } else {
    return Math.random() < 0.5 ? Math.floor(Math.random() * 16) : 0; // 50% chance of snow (0–15 mm)
  }
};

const getWeatherCondition = (temperature: number, season: string, precipitation: number): string => {
  const conditionPool: string[] = [];

  if (temperature <= 0) {
    conditionPool.push('Snowy', 'Windy', 'Cloudy');
  } else if (precipitation > 0) {
    conditionPool.push('Rainy', 'Cloudy');
  } else if (temperature <= 10) {
    conditionPool.push('Windy', 'Cloudy');
  } else if (temperature <= 20) {
    conditionPool.push('Cloudy', 'Sunny');
  } else {
    conditionPool.push('Sunny', 'Cloudy');
  }

  const randomIndex = Math.floor(Math.random() * conditionPool.length);
  return conditionPool[randomIndex];
};

export const getWeatherForDate = (dateParam?: string): WeatherData => {
  const date = dateParam || new Date().toISOString().split('T')[0]; // Default to current date
  return generateWeatherForDate(date);
};

export const getWeatherForMonth = (monthParam?: string): WeatherData[] => {
  const currentDate = new Date();
  const yearMonth = monthParam || `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

  const [year, month] = yearMonth.split('-').map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  const weatherData: WeatherData[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${yearMonth}-${String(day).padStart(2, '0')}`;
    weatherData.push(generateWeatherForDate(date));
  }
  return weatherData;
};
