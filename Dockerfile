# Usar Node.js LTS como imagen base
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto
EXPOSE 8080

# Variable de entorno para el puerto
ENV PORT=8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]

