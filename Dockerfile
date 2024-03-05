# Specify a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 8001 to the outside once the container has launched
EXPOSE 8001

# Command to run the app
CMD ["node", "index.js"]
