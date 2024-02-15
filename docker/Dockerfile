FROM node:latest

# Set the working directory in the container
WORKDIR /home/user/

# Copy .json to the working directory
COPY ./*.json ./

# Install app dependencies
RUN npm install

# Copy the application code to the container
COPY ./src ./src

# Build the application
RUN npm run build

# Expose the port on which the app runs
EXPOSE 3000

# Command to run your application
CMD ["node", "dist/main"]