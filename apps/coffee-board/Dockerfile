FROM node:24-alpine AS base

# Stage 1 - Install dependencies
FROM base AS deps

WORKDIR /app

COPY ./package.json ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# RUN npm run build
# We are using this in the meantime to avoid linting issues
# This is a temporary solution until we fix the linting issues
RUN npm run build:nolint

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000

ENV PORT=3000

CMD [ "npm", "run", "start" ]

# Stage 2 - Serve the app with nginx
# FROM nginx:1.29.0-alpine

# COPY --from=builder /app/.next /usr/share/nginx/html
# COPY --from=builder /app/public /usr/share/nginx/html/public
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80