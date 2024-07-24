# Etapa 1: Dependencias
FROM node:22.2-alpine3.20 AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

# Etapa 2: Construcción
FROM node:22.2-alpine3.20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
# Aquí no necesitamos construir para producción, ya que estamos en modo desarrollo

# Etapa 3: Final
FROM node:22.2-alpine3.20 AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Exponer el puerto 3000
EXPOSE 3000

# Inicia la aplicación en modo desarrollo
CMD ["npm", "start"]
