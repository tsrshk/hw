# 1. Use official Node image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# 4. Copy app files
COPY . .


# 5. Build Next.js app
RUN npm run build

# 6. Start app (can be changed to `next start` for production)
CMD ["npm", "run", "dev"]
