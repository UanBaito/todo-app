FROM node:17-alpine AS base
USER node
WORKDIR /app
COPY --chown=node:node package*.json ./

# Install production dependencies only
FROM node:17-alpine AS deps
USER node
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev 

# Compile typescript sources
FROM base AS build
USER node
WORKDIR /app
RUN npm install typescript
COPY --chown=node:node tsconfig.json tsconfig.json
COPY --chown=node:node src/ src/
RUN npm run build

# Combine production only node_modules with compiled javascript files.
FROM node:17-alpine AS final
USER node
WORKDIR /app
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist/
COPY --chown=node:node --from=deps /app/package*.json ./
EXPOSE 3000
CMD ["node", "/app/dist/app.js" ]

