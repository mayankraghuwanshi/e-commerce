# Use official Node.js LTS image
FROM node:23.10.0-alpine

WORKDIR /app

# Copy only package files first for better caching
COPY package.json ./
COPY package-lock.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install dependencies for both backend and frontend
RUN npm run install:all

# Now copy the rest of the code
COPY . .
RUN ls

# Build the frontend
RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "start"]