# Use the latest Node.js 20 LTS base image
FROM node:20

# Maintainer information (deprecated but still added for legacy compatibility)
MAINTAINER Your Name <your-email@example.com>

# Metadata labels for better image documentation
LABEL maintainer="Your Name <your-email@example.com>"
LABEL description="A lightweight and scalable API for managing student gradebooks, built with Node.js and TypeScript."
LABEL version="1.0.0"
LABEL app="Student Gradebook API"

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Ensure permissions for the working directory
RUN chmod -R 755 /usr/src/app

# Ensure grades.json exists (or gets created later)
COPY grades.json ./grades.json

# Ensure the public directory is copied for serving static files
COPY public ./public

# Expose the port your app will run on
EXPOSE 8000

# Build the TypeScript code
RUN npm run build

# Default command to run your application
CMD ["node", "dist/app.js"]
