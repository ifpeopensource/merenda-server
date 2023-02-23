import express from 'express';

import AuthMiddleware from '#middlewares/AuthMiddleware.js';
import RequireVerifierMiddleware from '#middlewares/RequireVerifierMiddleware.js';

import MealSessionController from '#controllers/MealSessionController.js';

const routes = express.Router();

routes.use('/meals', AuthMiddleware);
routes.use('/meals', RequireVerifierMiddleware);

routes.post('/meals/:sessionId', MealSessionController.addStudent);

routes.get('/meals/:sessionId/:studentId', MealSessionController.verifyStudent);

routes.post('/meals', MealSessionController.startSession);

routes.patch('/meals/:sessionId', MealSessionController.closeSession);

export default routes;
