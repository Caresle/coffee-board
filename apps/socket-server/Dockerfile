FROM node:24-alpine AS base

# Stage 1 - Install dependencies
FROM base AS deps
WORKDIR /app
COPY ./package.json ./
RUN npm install

# Stage 2 - Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3001
CMD [ "node", "build/index.js" ]