import { generateUsers, generatePets } from '../utils/mocking.js';
import { petsService, usersService } from '../services/index.js';
import userModel from '../dao/models/User.js';
import petModel from '../dao/models/Pet.js';

/**
 * Endpoint GET /mockingpets
 * Genera y devuelve una lista de pets mock usando faker-js
 */
const getMockingPets = async (req, res) => {
    try {
        const numPets = 50; // Por defecto 50 pets
        const pets = generatePets(numPets);
        res.send({ status: "success", payload: pets });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

/**
 * Endpoint GET /mockingusers
 * Genera y devuelve 50 usuarios mock usando faker-js con el formato de Mongo
 */
const getMockingUsers = async (req, res) => {
    try {
        const numUsers = 50;
        const users = generateUsers(numUsers);
        res.send({ status: "success", payload: users });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

/**
 * Endpoint POST /generateData
 * Genera e inserta usuarios y pets en la base de datos según parámetros numéricos usando faker-js
 */
const generateData = async (req, res) => {
    try {
        const { users, pets } = req.body;

        // Validar que se reciban los parámetros
        if (users === undefined || pets === undefined) {
            return res.status(400).send({ 
                status: "error", 
                error: "Se requieren los parámetros 'users' y 'pets' en el body" 
            });
        }

        // Validar que sean números
        if (typeof users !== 'number' || typeof pets !== 'number') {
            return res.status(400).send({ 
                status: "error", 
                error: "Los parámetros 'users' y 'pets' deben ser números" 
            });
        }

        // Validar que sean números positivos
        if (users < 0 || pets < 0) {
            return res.status(400).send({ 
                status: "error", 
                error: "Los parámetros 'users' y 'pets' deben ser números positivos" 
            });
        }

        // Generar usuarios
        const generatedUsers = generateUsers(users);
        const insertedUsers = await userModel.insertMany(generatedUsers);

        // Generar pets
        const generatedPets = generatePets(pets);
        const insertedPets = await petModel.insertMany(generatedPets);

        res.send({ 
            status: "success", 
            message: `Se generaron e insertaron ${users} usuarios y ${pets} pets correctamente`,
            payload: {
                users: insertedUsers.length,
                pets: insertedPets.length
            }
        });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

export default {
    getMockingPets,
    getMockingUsers,
    generateData
};

