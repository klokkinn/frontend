### Dependency stage
FROM node:lts-alpine AS dep-stage

WORKDIR /build

COPY package*.json ./

RUN npm ci

### Build stage
FROM node:lts-alpine AS build-stage

WORKDIR /build

COPY --from=dep-stage /build/node_modules ./node_modules

COPY package*.json ./

COPY public/ ./public
COPY scripts/ ./scripts
COPY vite.config.js .
COPY index.html .

COPY src/ ./src

RUN npm run build

### Run
FROM nginx:stable-alpine AS production-stage
EXPOSE 80
CMD ["entrypoint.sh"]

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
	ln -sf /dev/stderr /var/log/nginx/error.log

COPY --from=build-stage /build/scripts/entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh

COPY --from=build-stage /build/dist /usr/share/nginx/html

