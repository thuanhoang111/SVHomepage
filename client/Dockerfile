# Use an official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY /package*.json ./

# Install the dependencies
RUN npm install

COPY / ./

# Build the project
RUN npm run build:production

# Use an official Nginx image as the base image
FROM nginx:1.19

COPY /nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the previous image to the Nginx image
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 for incoming HTTP requests
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]