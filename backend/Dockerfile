FROM node:18-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY src ./src

# Exponer puerto
EXPOSE 5000

# Comando para iniciar
CMD ["npm", "start"]
