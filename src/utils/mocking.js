import bcrypt from 'bcrypt';

/**
 * Genera usuarios mock según un parámetro numérico
 * @param {number} numUsers - Cantidad de usuarios a generar
 * @returns {Array} Array de usuarios generados
 */
export const generateUsers = (numUsers) => {
    const users = [];
    const roles = ['user', 'admin'];
    
    for (let i = 0; i < numUsers; i++) {
        const user = {
            first_name: `Usuario${i + 1}`,
            last_name: `Apellido${i + 1}`,
            email: `user${i + 1}@example.com`,
            password: bcrypt.hashSync('coder123', 10), // Contraseña encriptada
            role: roles[Math.floor(Math.random() * roles.length)], // 'user' o 'admin'
            pets: [] // Array vacío
        };
        users.push(user);
    }
    
    return users;
};

/**
 * Genera pets mock según un parámetro numérico
 * @param {number} numPets - Cantidad de pets a generar
 * @returns {Array} Array de pets generados
 */
export const generatePets = (numPets) => {
    const pets = [];
    const species = ['Perro', 'Gato', 'Conejo', 'Hamster', 'Pájaro'];
    
    for (let i = 0; i < numPets; i++) {
        const pet = {
            name: `Mascota${i + 1}`,
            specie: species[Math.floor(Math.random() * species.length)],
            birthDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            adopted: false,
            owner: null,
            image: ''
        };
        pets.push(pet);
    }
    
    return pets;
};

