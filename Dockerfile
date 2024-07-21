# Use an official Node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

RUN apk add --no-cache g++ python3 openjdk11

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate
RUN npx prisma db push

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]