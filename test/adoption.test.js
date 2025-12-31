import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import userModel from '../src/dao/models/User.js';
import petModel from '../src/dao/models/Pet.js';
import adoptionModel from '../src/dao/models/Adoption.js';
import bcrypt from 'bcrypt';

const expect = chai.expect;
const requester = supertest(app);

describe('Tests de Adoption Router', () => {
    let testUser;
    let testPet;
    let testAdoption;
    let testUser2;
    let testPet2;

    before(async () => {
        // Conectar a una base de datos de prueba
        const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/test-adoptions';
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGO_URL);
        }

        // Limpiar colecciones antes de los tests
        await userModel.deleteMany({});
        await petModel.deleteMany({});
        await adoptionModel.deleteMany({});

        // Crear usuario de prueba
        testUser = await userModel.create({
            first_name: 'Test',
            last_name: 'User',
            email: 'testuser@example.com',
            password: bcrypt.hashSync('password123', 10),
            role: 'user',
            pets: []
        });

        // Crear segundo usuario de prueba
        testUser2 = await userModel.create({
            first_name: 'Test2',
            last_name: 'User2',
            email: 'testuser2@example.com',
            password: bcrypt.hashSync('password123', 10),
            role: 'user',
            pets: []
        });

        // Crear mascota de prueba (no adoptada)
        testPet = await petModel.create({
            name: 'TestPet',
            specie: 'Perro',
            birthDate: new Date('2020-01-01'),
            adopted: false,
            owner: null,
            image: ''
        });

        // Crear segunda mascota de prueba (no adoptada)
        testPet2 = await petModel.create({
            name: 'TestPet2',
            specie: 'Gato',
            birthDate: new Date('2021-01-01'),
            adopted: false,
            owner: null,
            image: ''
        });

        // Crear adopción de prueba
        testAdoption = await adoptionModel.create({
            owner: testUser._id,
            pet: testPet._id
        });
    });

    after(async () => {
        // Limpiar después de los tests
        await userModel.deleteMany({});
        await petModel.deleteMany({});
        await adoptionModel.deleteMany({});
        await mongoose.connection.close();
    });

    describe('GET /api/adoptions', () => {
        it('Debería obtener todas las adopciones exitosamente', async () => {
            const response = await requester
                .get('/api/adoptions')
                .expect(200);

            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('payload');
            expect(response.body.payload).to.be.an('array');
        });

        it('Debería retornar un array de adopciones', async () => {
            const response = await requester
                .get('/api/adoptions')
                .expect(200);

            expect(response.body.payload).to.be.an('array');
            if (response.body.payload.length > 0) {
                expect(response.body.payload[0]).to.have.property('owner');
                expect(response.body.payload[0]).to.have.property('pet');
            }
        });
    });

    describe('GET /api/adoptions/:aid', () => {
        it('Debería obtener una adopción por ID exitosamente', async () => {
            const response = await requester
                .get(`/api/adoptions/${testAdoption._id}`)
                .expect(200);

            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('payload');
            expect(response.body.payload).to.have.property('_id');
            expect(response.body.payload._id.toString()).to.equal(testAdoption._id.toString());
        });

        it('Debería retornar 404 si la adopción no existe', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await requester
                .get(`/api/adoptions/${fakeId}`)
                .expect(404);

            expect(response.body).to.have.property('status', 'error');
            expect(response.body).to.have.property('error', 'Adoption not found');
        });

        it('Debería retornar 404 con un ID inválido', async () => {
            const response = await requester
                .get('/api/adoptions/invalid-id')
                .expect(404);

            expect(response.body).to.have.property('status', 'error');
        });
    });

    describe('POST /api/adoptions/:uid/:pid', () => {
        it('Debería crear una adopción exitosamente', async () => {
            const response = await requester
                .post(`/api/adoptions/${testUser2._id}/${testPet2._id}`)
                .expect(200);

            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('message', 'Pet adopted');

            // Verificar que la mascota fue marcada como adoptada
            const updatedPet = await petModel.findById(testPet2._id);
            expect(updatedPet.adopted).to.be.true;
            expect(updatedPet.owner.toString()).to.equal(testUser2._id.toString());

            // Verificar que el usuario tiene la mascota en su array
            const updatedUser = await userModel.findById(testUser2._id);
            expect(updatedUser.pets).to.be.an('array');
            expect(updatedUser.pets.some(p => p._id.toString() === testPet2._id.toString())).to.be.true;

            // Verificar que se creó la adopción
            const adoption = await adoptionModel.findOne({
                owner: testUser2._id,
                pet: testPet2._id
            });
            expect(adoption).to.not.be.null;
        });

        it('Debería retornar 404 si el usuario no existe', async () => {
            const fakeUserId = new mongoose.Types.ObjectId();
            const response = await requester
                .post(`/api/adoptions/${fakeUserId}/${testPet._id}`)
                .expect(404);

            expect(response.body).to.have.property('status', 'error');
            expect(response.body).to.have.property('error', 'user Not found');
        });

        it('Debería retornar 404 si la mascota no existe', async () => {
            const fakePetId = new mongoose.Types.ObjectId();
            const response = await requester
                .post(`/api/adoptions/${testUser._id}/${fakePetId}`)
                .expect(404);

            expect(response.body).to.have.property('status', 'error');
            expect(response.body).to.have.property('error', 'Pet not found');
        });

        it('Debería retornar 400 si la mascota ya está adoptada', async () => {
            // Crear una mascota ya adoptada
            const adoptedPet = await petModel.create({
                name: 'AdoptedPet',
                specie: 'Conejo',
                birthDate: new Date('2019-01-01'),
                adopted: true,
                owner: testUser._id,
                image: ''
            });

            const response = await requester
                .post(`/api/adoptions/${testUser2._id}/${adoptedPet._id}`)
                .expect(400);

            expect(response.body).to.have.property('status', 'error');
            expect(response.body).to.have.property('error', 'Pet is already adopted');

            // Limpiar
            await petModel.findByIdAndDelete(adoptedPet._id);
        });
    });
});

