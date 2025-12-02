FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG VITE_PRODUCTS_API_URL
ARG VITE_CATEGORIES_API_URL
ENV VITE_PRODUCTS_API_URL=$VITE_PRODUCTS_API_URL
ENV VITE_CATEGORIES_API_URL=$VITE_CATEGORIES_API_URL

RUN npm run build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
