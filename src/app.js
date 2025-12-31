import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT||8080;

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'API de Mascotas y Adopciones',
            description: 'Documentación de la API para gestión de usuarios, mascotas y adopciones',
            version: '1.0.0',
        },
    },
    apis: [`${join(__dirname, './routes/*.js')}`, `${join(__dirname, './controllers/*.js')}`],
};

const specs = swaggerJsdoc(swaggerOptions);

// Configuración de seguridad con Helmet
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "defaultSrc": ["'self'"],
                "scriptSrc": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
                "styleSrc": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
                "imgSrc": ["'self'", "data:", "https:"],
            },
            reportOnly: false,
        },
        crossOriginEmbedderPolicy: false,
    })
);

// Conexión a MongoDB (opcional - solo se conecta si hay URL válida)
const MONGO_URL = process.env.MONGO_URL || 'URL DE MONGO';
if (MONGO_URL && MONGO_URL !== 'URL DE MONGO' && MONGO_URL.startsWith('mongodb')) {
    mongoose.connect(MONGO_URL).catch(err => console.log('Error de conexión a MongoDB:', err.message));
}

app.use(express.json());
app.use(cookieParser());
app.use(express.static(join(__dirname, '../public')));

// Swagger documentation
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).send({
        status: 'error',
        error: err.message || 'Internal server error'
    });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        error: 'Route not found'
    });
});

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
