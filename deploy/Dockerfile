# Build the static site, then serve it with nginx. Build context: repository root.
#   docker compose -f deploy/docker-compose.yml up -d --build
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:1.29-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/.htaccess
EXPOSE 80
