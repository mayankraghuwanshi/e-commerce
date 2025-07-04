# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install dependencies for both backend and frontend
RUN npm run install:all

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN npm run build

# Expose the backend port
EXPOSE 5001

# Start the backend server
CMD ["npm", "run", "start"]
