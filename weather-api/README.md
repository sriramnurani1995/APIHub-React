# Weather API Hub

A scalable and realistic Weather API that simulates weather conditions for specific dates and months. Perfect for developers working on web projects requiring dynamic and seasonal weather data.

## Features

- Generate realistic weather data for specific dates or entire months.
- Includes the following fields:
  - **Temperature**: Min, Max, and Average values.
  - **Wind**: Speed and gusts in km/h.
  - **Precipitation**: Rain or snow in mm.
  - **Condition**: Weather state (Sunny, Cloudy, Rainy, Snowy, etc.).
  - **Description**: A textual description of the weather.
- Dynamic seasonal randomization ensures data reflects realistic weather patterns.
- Includes a user-friendly landing page with API details.
- Lightweight, containerized, and easily deployable.

---

## API Endpoints

### GET /api/weather/date/:date?

Retrieve weather data for a specific date. If no date is provided, defaults to the current date.

#### Path Parameters:

| Parameter | Description                    | Example    | Default      |
| --------- | ------------------------------ | ---------- | ------------ |
| :date     | The date in YYYY-MM-DD format. | 2024-12-09 | Current Date |

#### Example Request:

```bash
GET /api/weather/date/2024-12-09
```

#### Example Response:

```json
{
  "date": "2024-12-09",
  "temperature": 12,
  "minTemperature": 8,
  "maxTemperature": 16,
  "averageTemperature": 12,
  "wind": 15,
  "gusts": 25,
  "precipitation": 5,
  "condition": "Cloudy",
  "description": "Overcast skies with mild temperatures."
}
```

---

### GET /api/weather/month/:month?

Retrieve weather data for a specific month. If no month is provided, defaults to the current month.

#### Path Parameters:

| Parameter | Description                  | Example | Default       |
| --------- | ---------------------------- | ------- | ------------- |
| :month    | The month in YYYY-MM format. | 2024-12 | Current Month |

#### Example Request:

```bash
GET /api/weather/month/2024-12
```

#### Example Response:

```json
[
  {
    "date": "2024-12-01",
    "temperature": 5,
    "minTemperature": 2,
    "maxTemperature": 8,
    "averageTemperature": 5,
    "wind": 20,
    "gusts": 30,
    "precipitation": 10,
    "condition": "Snowy",
    "description": "Snowy weather, please bundle up!"
  },
  {
    "date": "2024-12-02",
    "temperature": 6,
    "minTemperature": 3,
    "maxTemperature": 9,
    "averageTemperature": 6,
    "wind": 15,
    "gusts": 25,
    "precipitation": 0,
    "condition": "Cloudy",
    "description": "Overcast skies with mild temperatures."
  }
]
```

---

## Local Development

### Prerequisites

1. Node.js: Version 20.x or above
2. npm: Installed with Node.js
3. Docker: (Optional) for containerized testing

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/weather-api-hub.git
cd weather-api-hub
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Start the development server:

```bash
npm start
```

5. Visit the API landing page:

```bash
http://localhost:6000
```

---

## Using Docker

### Build the Docker Image

```bash
docker build -t weather-api:latest .
```

### Run the Docker Container

```bash
docker run -d -p 6000:6000 --name weather-api-container weather-api:latest
```

Visit the API at:

```bash
http://localhost:6000
```

---

## Deployment to Cloud Run

1. Push the Docker Image to Google Artifact Registry:

```bash
docker tag weather-api:latest REGION-docker.pkg.dev/<PROJECT_ID>/weather-api/weather-api:latest
docker push REGION-docker.pkg.dev/<PROJECT_ID>/weather-api/weather-api:latest
```

2. Deploy to Cloud Run:

```bash
gcloud run deploy weather-api \
--image REGION-docker.pkg.dev/<PROJECT_ID>/weather-api/weather-api:latest \
--region REGION \
--platform managed \
--allow-unauthenticated
```

3. Access your deployed API at the URL provided by Cloud Run.

---

## Project Structure

```
weather-api-hub/
├── src/
│   ├── services/
│   │   └── weatherService.ts     # Core logic for weather generation
│   ├── public/
│   │   ├── index.html            # Landing page
│   │   └── styles.css            # Styles for the landing page
│   └── app.ts                    # Main entry point for the API
├── dist/                         # Compiled JavaScript files
├── Dockerfile                    # Docker configuration
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript configuration
```

---

## Testing the API

### Unit Tests

1. Run tests:

```bash
npm test
```

2. View test coverage:

```bash
npm run coverage
```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

Maintainer: Sriram Nurani Subramanyam
Email: srirams@pdx.edu
