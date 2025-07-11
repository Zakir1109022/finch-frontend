# Stage 1: Build the Vue.js app
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to leverage Docker's cache
COPY package*.json ./

# Install dependencies
RUN npm install --f

# Copy the rest of the application code
COPY . .

# Build the Vue.js application for production
RUN npm run build


# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built Vue.js application from the 'build' stage to Nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to allow external access to the Nginx server
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]