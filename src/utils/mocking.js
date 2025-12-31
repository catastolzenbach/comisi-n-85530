import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

/**
 * Genera usuarios mock según un parámetro numérico usando faker-js
 * @param {number} numUsers - Cantidad de usuarios a generar
 * @returns {Array} Array de usuarios generados
 */
export const generateUsers = (numUsers) => {
    const users = [];
    const roles = ['user', 'admin'];
    
    for (let i = 0; i < numUsers; i++) {
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('coder123', 10), // Contraseña encriptada
            role: faker.helpers.arrayElement(roles), // 'user' o 'admin'
            pets: [] // Array vacío
        };
        users.push(user);
    }
    
    return users;
};

/**
 * Genera pets mock según un parámetro numérico usando faker-js
 * @param {number} numPets - Cantidad de pets a generar
 * @returns {Array} Array de pets generados
 */
export const generatePets = (numPets) => {
    const pets = [];
    const species = ['Perro', 'Gato', 'Conejo', 'Hamster', 'Pájaro'];
    
    for (let i = 0; i < numPets; i++) {
        const pet = {
            name: faker.person.firstName(), // Nombres realistas para mascotas
            specie: faker.helpers.arrayElement(species),
            birthDate: faker.date.birthdate({ min: 0, max: 10, mode: 'age' }), // Fechas de nacimiento realistas
            adopted: false,
            owner: null,
            image: ''
        };
        pets.push(pet);
    }
    
    return pets;
};

