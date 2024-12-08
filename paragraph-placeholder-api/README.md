# Paragraph Placeholder API

A lightweight and scalable API that generates placeholder paragraphs for various text types. Ideal for developers working on web projects who need dynamic, customizable text placeholders.

## Features

- Generate paragraphs of **varying lengths** (short, medium, or long).
- Choose from multiple **text types**, including:
  - `lorem`: Standard placeholder text.
  - `cat`: Cat-themed placeholder text.
  - `pup`: Dog-themed placeholder text.
  - `business`: Professional jargon placeholder text.
  - `tech`: Technology-related placeholder text.
  - `hipster`: Hipster-themed placeholder text.
- Specify the **number of paragraphs** to generate (1 to 10).
- Designed for **educational purposes**, focusing on accessibility and scalability.

---

## API Endpoints

### **GET /api/paragraphs**

#### Query Parameters:

| Parameter | Description                              | Accepted Values                                              | Default  |
| --------- | ---------------------------------------- | ------------------------------------------------------------ | -------- |
| `type`    | The type of placeholder text to generate | `lorem`, `cat`, `pup`, `business`, `tech`, `hipster`         | `lorem`  |
| `length`  | The desired length of the paragraphs     | `short` (40 words), `medium` (100 words), `long` (200 words) | `medium` |
| `count`   | The number of paragraphs to generate     | 1 to 10                                                      | `1`      |

#### Example Request:

```bash
GET /api/paragraphs?type=cat&length=medium&count=3
```

#### Example Response:

```json
{
  "paragraphs": [
    "Rub against legs for attention. Knock over a plant. Play with dangling string.",
    "Stare at birds. Jump on countertop. Scratch furniture. Nap in the sun.",
    "Climb curtains. Chase laser dot. Sleep in a cardboard box. Bring a dead mouse as a gift."
  ]
}
```

---

## Local Development

### **Prerequisites**

1. **Node.js**: Version 20.x or above
2. **npm**: Installed with Node.js
3. **Docker**: (Optional) for containerized testing

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/paragraph-placeholder-api.git
   cd paragraph-placeholder-api
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
   http://localhost:5000
   ```

---

## Using Docker

### **Build the Docker Image**

```bash
docker build -t paragraph-placeholder-api:1.0 .
```

### **Run the Docker Container**

```bash
docker run -p 5000:5000 paragraph-placeholder-api:1.0
```

---

## Deployment to Cloud Run

1. **Push the Docker Image to Google Artifact Registry**:

   ```bash
   docker tag paragraph-placeholder-api:1.0 us-west1-docker.pkg.dev/<PROJECT_ID>/paragraph-placeholder-api/paragraph-placeholder-api:1.0
   docker push us-west1-docker.pkg.dev/<PROJECT_ID>/paragraph-placeholder-api/paragraph-placeholder-api:1.0
   ```

2. **Deploy to Cloud Run**:

   ```bash
   gcloud run deploy paragraph-placeholder-api      --image us-west1-docker.pkg.dev/<PROJECT_ID>/paragraph-placeholder-api/paragraph-placeholder-api:1.0      --region us-west1      --platform managed      --allow-unauthenticated
   ```

3. Access your deployed API at the URL provided by Cloud Run.

---

## Project Structure

```
paragraph-placeholder-api/
├── src/
│   ├── services/
│   │   └── paragraphService.ts  # Core logic for paragraph generation
│   ├── public/
│   │   └── index.html           # Landing page for the API
│   └── app.ts                   # Main entry point for the API
├── dist/                        # Compiled JavaScript files
├── Dockerfile                   # Docker configuration
├── package.json                 # Dependencies and scripts
└── tsconfig.json                # TypeScript configuration
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

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Contact

**Maintainer**: Sriram Nurani Subramanyam  
**Email**: srirams@pdx.edu
