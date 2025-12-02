# ---------- Stage 1: Build the NestJS App ----------
FROM node:18 AS builder

WORKDIR /app

# Copy package files first to install dependencies
COPY package*.json ./

# Install all dependencies (dev + prod)
RUN npm install

# Copy all source code
COPY . .

# Build the NestJS project → creates "dist/"
RUN npm run build


# ---------- Stage 2: Run the Built App ----------
FROM node:18

WORKDIR /app

# Copy package files again for production install
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --only=production

# Copy compiled dist folder from builder
COPY --from=builder /app/dist ./dist

# Copy prisma folder if exists (important!)
COPY --from=builder /app/prisma ./prisma

# Expose port (matches NestJS default)
EXPOSE 3000

# Start the backend
CMD ["node", "dist/main.js"]
