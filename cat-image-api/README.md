# Cat Image API

The **Cat Image API** dynamically resizes and serves placeholder cat images. It is ideal for student projects requiring visually appealing placeholder content.

---

## **Features**

- Dynamically resizes images based on the requested dimensions.
- Serves random cat images from a predefined collection of files.

---

## **Source Code Overview**

### **What `app.ts` Does**

The `app.ts` file contains the core application logic for the Cat Image API. It is responsible for:

1. **Setting Up the Server**:

   - Configures the server using **Express.js**.
   - Defines the port the application runs on.

2. **Image Resizing Logic**:

   - Reads images from the `src/data/cat-images/` directory.
   - Selects a random image from the directory.
   - Resizes the image dynamically based on the dimensions specified in the URL (`:width` and `:height`) using the **Sharp** library.

3. **API Endpoint**:

   - **`GET /api/cats/:width/:height`**:  
     Handles requests for a randomly resized cat image.

4. **Error Handling**:

   - Returns meaningful error messages if:
     - The requested dimensions are invalid.
     - No images are available in the directory.
     - An internal server error occurs during processing.

5. **Environment Variables**:
   - Supports configuration through environment variables (e.g., `PORT`).

---

## **API Documentation**

### **Endpoint**

`GET /api/cats/:width/:height`

### **Parameters**

- `:width` (integer): Desired width of the image in pixels.
- `:height` (integer): Desired height of the image in pixels.

---

### **Examples**

1. **Retrieve a 200x200 Cat Image**:

   ```
   GET /api/cats/200/200
   ```

   Response: A dynamically resized 200x200 cat image.

2. **Retrieve a 400x300 Cat Image**:
   ```
   GET /api/cats/400/300
   ```
   Response: A dynamically resized 400x300 cat image.

---

## **Setup Instructions**

### **Local Setup**

1. Clone the repository:

   ```bash
   git clone git@github.com:sriramnurani1995/APIHub-React.git
   cd APIHub-React/cat-image-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the TypeScript code:

   ```bash
   npm run build
   ```

4. Start the application:

   ```bash
   npm start
   ```

5. Test the API:
   Use a browser, Postman, or curl to test the endpoint. For example:
   ```
   http://localhost:3000/api/cats/200/200
   ```

---

## **Docker Setup**

1. Build the Docker image:

   ```bash
   docker build -t cat-image-api .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 cat-image-api
   ```

3. Test the API:
   Use the same endpoint as above:
   ```
   http://localhost:3000/api/cats/200/200
   ```

---

## **Deploying to Google Cloud**

### **1. Build and Push the Docker Image**

Replace `<your-project-id>` with your GCP project ID.

1. Tag the Docker image:

   ```bash
   docker tag cat-image-api us-west1-docker.pkg.dev/<your-project-id>/cat-image-api/cat-image-api:latest
   ```

2. Push the image to Google Artifact Registry:
   ```bash
   docker push us-west1-docker.pkg.dev/<your-project-id>/cat-image-api/cat-image-api:latest
   ```

---

### **2. Deploy to Cloud Run**

1. Deploy the Docker image to Cloud Run:

   ```bash
   gcloud run deploy cat-image-api        --image us-west1-docker.pkg.dev/<your-project-id>/cat-image-api/cat-image-api:latest        --platform managed        --region us-west1        --allow-unauthenticated
   ```

2. Test the deployed API:
   GCP will provide a public URL for your API, such as:
   ```
   https://cat-image-api-xyz123.run.app/api/cats/200/200
   ```

---

## **Folder Structure**

```
cat-image-api/
├── src/
│   ├── app.ts              # Main application logic
│   ├── data/
│       ├── cat-images/     # Folder containing cat images
│           ├── cat1.jpg
│           ├── cat2.jpg
├── dist/                   # Compiled files (after build)
├── Dockerfile              # Docker configuration
├── .dockerignore           # Files to exclude from Docker build
├── package.json            # Node.js dependencies
├── package-lock.json       # Dependency lock file
├── tsconfig.json           # TypeScript configuration
├── README.md               # Documentation
```

---

## **Future Enhancements**

- Add support for additional image formats (e.g., PNG, GIF).
- Extend the library of placeholder cat images.
- Add caching for frequently requested image sizes.
