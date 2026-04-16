FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --production
RUN npm install -g serve
CMD ["serve", "-s", "dist/mutual-funds-app/browser/", "-l", "8000"]

# docker buildx build -t mutual-funds-front:v1 .  
# docker run -d -p 8000:8000 --name angular-app mutual-funds-front:v1

# # Build stage
# FROM node:18-alpine AS build

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --legacy-peer-deps

# COPY . .
# RUN npm run build -- --configuration production


# # Production stage (no nginx)
# FROM node:18-alpine

# WORKDIR /app

# RUN npm install -g serve

# COPY --from=build /app/dist/mutual-funds-app/browser ./dist

# EXPOSE 3000

# CMD ["serve", "-s", "dist", "-l", "3000"]