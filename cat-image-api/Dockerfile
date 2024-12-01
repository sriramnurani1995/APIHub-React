# Use a compatible Node.js version for sharp
FROM node:20 AS builder

# Add metadata about the image
LABEL maintainer="Sriram Nurani Subramanyam<srirams@pdx.edu>"
LABEL description="Cat Image API to dynamically resize images"

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application and build the TypeScript code
COPY . .

# Copy static files (images) into the image
COPY src/data /usr/src/app/src/data

RUN npm run build

# Rebuild sharp to ensure compatibility with the current environment
RUN npm rebuild sharp

# Use a lightweight Node.js runtime image for the final image
FROM node:20-alpine

# Set the working directory in the final image
WORKDIR /usr/src/app

# Copy only the built files and dependencies from the builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/src/data ./src/data
COPY --from=builder /usr/src/app/public ./public
# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]
