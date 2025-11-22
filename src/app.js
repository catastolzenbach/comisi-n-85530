import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT||8080;

// Conexión a MongoDB (opcional - solo se conecta si hay URL válida)
const MONGO_URL = process.env.MONGO_URL || 'URL DE MONGO';
if (MONGO_URL && MONGO_URL !== 'URL DE MONGO' && MONGO_URL.startsWith('mongodb')) {
    mongoose.connect(MONGO_URL).catch(err => console.log('Error de conexión a MongoDB:', err.message));
}

app.use(express.json());
app.use(cookieParser());
app.use(express.static(join(__dirname, '../public')));

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
