import express, { Request, Response } from 'express';
import path from 'path';
import { getWeatherForDate, getWeatherForMonth } from './services/weatherService';

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/weather/date/:date?', (req: Request, res: Response) => {
  const { date } = req.params;
  const weather = getWeatherForDate(date); // Fetch weather for the given or default date
  return res.json(weather);
});

app.get('/api/weather/month/:month?', (req: Request, res: Response) => {
  const { month } = req.params;
  const weather = getWeatherForMonth(month); // Fetch weather for the given or default month
  return res.json(weather);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
