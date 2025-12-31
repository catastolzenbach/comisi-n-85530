# API de Mascotas y Adopciones

API REST desarrollada con Node.js, Express y MongoDB para la gestión de usuarios, mascotas y adopciones.

## 🚀 Características

- Gestión de usuarios (CRUD completo)
- Gestión de mascotas
- Sistema de adopciones
- Autenticación con JWT
- Generación de datos mock con faker-js
- Documentación con Swagger
- Tests funcionales con Mocha y Chai

## 📋 Requisitos Previos

- Node.js 18 o superior
- MongoDB (local o remoto)
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd comision-85530
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con:
```
PORT=8080
MONGO_URL=mongodb://localhost:27017/nombre-base-datos
```

## 🏃 Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

La aplicación estará disponible en `http://localhost:8080`

## 📚 Documentación API

La documentación interactiva de la API está disponible en:
```
http://localhost:8080/api/docs
```

### Endpoints Principales

#### Users
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:uid` - Obtener un usuario por ID
- `PUT /api/users/:uid` - Actualizar un usuario
- `DELETE /api/users/:uid` - Eliminar un usuario

#### Pets
- `GET /api/pets` - Obtener todas las mascotas
- `GET /api/pets/:pid` - Obtener una mascota por ID
- `POST /api/pets` - Crear una nueva mascota
- `PUT /api/pets/:pid` - Actualizar una mascota
- `DELETE /api/pets/:pid` - Eliminar una mascota

#### Adoptions
- `GET /api/adoptions` - Obtener todas las adopciones
- `GET /api/adoptions/:aid` - Obtener una adopción por ID
- `POST /api/adoptions/:uid/:pid` - Crear una nueva adopción

#### Mocks
- `GET /api/mocks/mockingpets` - Generar 50 pets mock
- `GET /api/mocks/mockingusers` - Generar 50 usuarios mock
- `POST /api/mocks/generateData` - Insertar usuarios y pets en la BD

## 🧪 Tests

Ejecutar todos los tests:
```bash
npm test
```

Ejecutar tests de adopciones:
```bash
npm run test:adoptions
```

## 🐳 Docker

### Construir la imagen

```bash
docker build -t api-mascotas-adopciones .
```

### Ejecutar el contenedor

```bash
docker run -p 8080:8080 -e MONGO_URL=tu-url-mongodb -e PORT=8080 api-mascotas-adopciones
```

### Docker Hub

La imagen de Docker está disponible en Docker Hub:

🔗 **Link de la imagen en Docker Hub:** [AQUÍ VA EL LINK DE TU IMAGEN EN DOCKERHUB]

Para usar la imagen desde Docker Hub:

```bash
docker pull tu-usuario/api-mascotas-adopciones:latest
docker run -p 8080:8080 -e MONGO_URL=tu-url-mongodb -e PORT=8080 tu-usuario/api-mascotas-adopciones:latest
```

### Docker Compose (Opcional)

Puedes crear un `docker-compose.yml` para facilitar el despliegue:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - PORT=8080
      - MONGO_URL=mongodb://mongo:27017/mascotas
    depends_on:
      - mongo
  
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

Ejecutar con:
```bash
docker-compose up
```

## 📦 Estructura del Proyecto

```
comision-85530/
├── src/
│   ├── app.js                 # Configuración principal de Express
│   ├── controllers/           # Controladores
│   ├── dao/                   # Data Access Object
│   │   └── models/           # Modelos de Mongoose
│   ├── routes/                # Rutas de la API
│   ├── services/              # Servicios de negocio
│   ├── repository/            # Repositorios
│   └── utils/                 # Utilidades
├── test/                      # Tests
├── public/                    # Archivos estáticos
├── Dockerfile                 # Configuración de Docker
├── .dockerignore             # Archivos a ignorar en Docker
├── package.json              # Dependencias del proyecto
└── README.md                 # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **Swagger** - Documentación API
- **Mocha & Chai** - Testing
- **Supertest** - Testing HTTP
- **Faker.js** - Generación de datos mock
- **Docker** - Contenedorización

## 📝 Notas

- Asegúrate de tener MongoDB corriendo antes de iniciar la aplicación
- Los tests requieren una base de datos de prueba configurada
- La documentación Swagger está disponible en `/api/docs`

## 👤 Autor

Catalina Stolzenbach

## 📄 Licencia

ISC

