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

Para construir la imagen Docker del proyecto, ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker build -t api-mascotas-adopciones .
```

**Explicación:**
- `docker build`: Comando para construir una imagen Docker
- `-t api-mascotas-adopciones`: Etiqueta (tag) que se le asigna a la imagen
- `.`: Indica que el Dockerfile está en el directorio actual

**Tiempo estimado:** 2-5 minutos dependiendo de la velocidad de tu conexión a internet.

### Ejecutar el contenedor

Una vez construida la imagen, puedes ejecutar el contenedor con:

```bash
docker run -p 8080:8080 \
  -e MONGO_URL=tu-url-mongodb \
  -e PORT=8080 \
  api-mascotas-adopciones
```

**Explicación de los parámetros:**
- `-p 8080:8080`: Mapea el puerto 8080 del contenedor al puerto 8080 de tu máquina
- `-e MONGO_URL=tu-url-mongodb`: Variable de entorno para la URL de MongoDB
  - Ejemplo local: `mongodb://localhost:27017/mascotas`
  - Ejemplo remoto: `mongodb+srv://usuario:password@cluster.mongodb.net/mascotas`
- `-e PORT=8080`: Variable de entorno para el puerto de la aplicación
- `api-mascotas-adopciones`: Nombre de la imagen a ejecutar

**Ejemplo completo con MongoDB local:**
```bash
docker run -p 8080:8080 \
  -e MONGO_URL=mongodb://host.docker.internal:27017/mascotas \
  -e PORT=8080 \
  api-mascotas-adopciones
```

**Ejemplo con MongoDB remoto (MongoDB Atlas):**
```bash
docker run -p 8080:8080 \
  -e MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/mascotas \
  -e PORT=8080 \
  api-mascotas-adopciones
```

**Nota:** Si usas MongoDB local, asegúrate de que MongoDB esté corriendo en tu máquina o usa Docker Compose (ver sección más abajo).

### Docker Hub

#### Subir la imagen a Docker Hub

Para subir la imagen a Docker Hub, sigue estos pasos:

1. **Inicia sesión en Docker Hub:**
```bash
docker login
```

2. **Construye la imagen con tu nombre de usuario de Docker Hub:**
```bash
docker build -t tu-usuario-dockerhub/api-mascotas-adopciones .
```

3. **Etiqueta la imagen para Docker Hub:**
```bash
docker tag api-mascotas-adopciones tu-usuario-dockerhub/api-mascotas-adopciones:latest
```

4. **Sube la imagen a Docker Hub:**
```bash
docker push tu-usuario-dockerhub/api-mascotas-adopciones:latest
```

5. **Una vez subida, tu imagen estará disponible en:**
```
https://hub.docker.com/r/tu-usuario-dockerhub/api-mascotas-adopciones
```

🔗 **Link de la imagen en Docker Hub:** [Reemplazar con el link real después de subir la imagen]

**Ejemplo:** `https://hub.docker.com/r/tu-usuario/api-mascotas-adopciones`

#### Usar la imagen desde Docker Hub

Una vez que la imagen esté disponible en Docker Hub, puedes usarla directamente:

```bash
# Descargar la imagen desde Docker Hub
docker pull tu-usuario-dockerhub/api-mascotas-adopciones:latest

# Ejecutar el contenedor
docker run -p 8080:8080 \
  -e MONGO_URL=tu-url-mongodb \
  -e PORT=8080 \
  tu-usuario-dockerhub/api-mascotas-adopciones:latest
```

**Nota:** Reemplaza `tu-usuario-dockerhub` con tu nombre de usuario real de Docker Hub.

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

Para ejecutar en segundo plano:
```bash
docker-compose up -d
```

Para detener los contenedores:
```bash
docker-compose down
```

### Utilizar el proyecto con Docker

Una vez que el contenedor esté corriendo, puedes:

1. **Acceder a la API:**
   - Base URL: `http://localhost:8080`
   - Documentación Swagger: `http://localhost:8080/api/docs`

2. **Probar los endpoints:**
   ```bash
   # Obtener todos los usuarios
   curl http://localhost:8080/api/users
   
   # Obtener todas las mascotas
   curl http://localhost:8080/api/pets
   
   # Generar datos mock
   curl http://localhost:8080/api/mocks/mockingusers
   ```

3. **Ver logs del contenedor:**
   ```bash
   docker logs <container-id>
   # O si usas docker-compose:
   docker-compose logs -f
   ```

4. **Detener el contenedor:**
   ```bash
   docker stop <container-id>
   # O con docker-compose:
   docker-compose down
   ```

5. **Reiniciar el contenedor:**
   ```bash
   docker restart <container-id>
   # O con docker-compose:
   docker-compose restart
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

