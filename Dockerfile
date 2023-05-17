# Fetching the latest node image on alpine linux
FROM node:10

# Setting up the work directory
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying all the files in our project
COPY . .

# Expose the specified port
EXPOSE 80

# Start the app
CMD ["npm", "start"]