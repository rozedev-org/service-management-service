# Start from the node image v18
FROM node:18.16.1-alpine

# Change the work directory app
WORKDIR /app

COPY ./package.json .
# Install dependencies
RUN npm install

# Copy the directory
COPY . .
ENV NEXT_PUBLIC_API_BFF /bff/api/service-manager-service/v1

# Compile files in the dist folder
RUN npm run build


#COPY dist ./dist
# Expose the port 3000
EXPOSE 8081

# install to datadog agent

# Run the server
CMD ["npm","run","start:prod"]
