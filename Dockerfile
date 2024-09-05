# # # Stage 1: Build the Node.js app
# # FROM node:18-alpine AS build

# # # Set the working directory
# # WORKDIR /app

# # # Copy the package.json and package-lock.json
# # COPY package*.json ./

# # # Install dependencies
# # RUN npm install


# # # Copy the rest of the application files
# # COPY . .

# # # Build the TypeScript files
# # RUN npm run build

# # # Stage 2: Run the Node.js app
# # FROM node:18-alpine

# # # Set the working directory
# # WORKDIR /app

# # # Copy the build files from the previous stage
# # COPY --from=build /app/dist ./dist
# # COPY package*.json ./

# # # Copy the knexfile.ts file
# # COPY knexfile.ts ./

# # # Install production dependencies
# # RUN npm install --production

# # # Copy the .env file
# # COPY .env ./

# # # RUN the migration script
# # # RUN npx knex migrate:latest --knexfile knexfile.ts

# # RUN ["sh", "-c", "npx knex migrate:latest"]
# # # Expose the port the app runs on
# # EXPOSE 8001

# # # Start the app
# # CMD ["node", "dist/index.js"]

# # Stage 1: Build the Node.js app
# FROM node:18-alpine AS build

# # Set the working directory
# WORKDIR /app

# # Copy the package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application files
# COPY . .

# # Build the TypeScript files
# RUN npm run build

# # Compile knexfile.ts to knexfile.js
# # RUN npx tsc knexfile.ts --outDir ./dist

# # Stage 2: Run the Node.js app
# FROM node:18-alpine

# # Set the working directory
# WORKDIR /app

# # Copy the build files from the previous stage
# COPY --from=build /app/dist ./dist
# COPY package*.json ./

# # Install production dependencies
# RUN npm install

# # Copy the .env file
# COPY .env ./

# # Run the migration scripts using the compiled JavaScript knexfile
# RUN npx knex migrate:latest --knexfile knexfile.js

# # Expose the port the app runs on
# EXPOSE 8001

# # Start the app
# CMD ["node", "dist/src/index.js"]



FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Run migrations
# RUN npx knex migrate:latest --knexfile ./knexfile.ts --cwd .

# Expose the port your app runs on
EXPOSE 8001

ENV NODE_ENV=development

# Define the command to run your application
CMD ["npm", "start"]