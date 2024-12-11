# Stage 1: Builder
FROM node:20 AS builder

# Add metadata about the image
LABEL maintainer="Sriram Nurani Subramanyam <srirams@pdx.edu>"
LABEL description="Weather API to simulate weather data dynamically"

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application and build the TypeScript code
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

# Set the working directory in the runtime image
WORKDIR /usr/src/app

# Copy only the built files and dependencies from the builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src/public ./dist/public
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expose the application port
EXPOSE 6000

# Start the application
CMD ["node", "dist/app.js"]
