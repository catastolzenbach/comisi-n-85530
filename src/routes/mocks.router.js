import { Router } from 'express';
import mocksController from '../controllers/mocks.controller.js';

const router = Router();

// Endpoint GET /api/mocks/mockingpets
router.get('/mockingpets', mocksController.getMockingPets);

// Endpoint GET /api/mocks/mockingusers
router.get('/mockingusers', mocksController.getMockingUsers);

// Endpoint POST /api/mocks/generateData
router.post('/generateData', mocksController.generateData);

export default router;

