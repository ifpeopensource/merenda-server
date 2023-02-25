import express from 'express';

import AuthMiddleware from '#middlewares/AuthMiddleware.js';
import RequireVerifierMiddleware from '#middlewares/RequireVerifierMiddleware.js';

import MealSessionController from '#controllers/MealSessionController.js';

const routes = express.Router();

routes.use('/meal-sessions', AuthMiddleware);
routes.use('/meal-sessions', RequireVerifierMiddleware);

routes.get('/meal-sessions/:mealSessionId', MealSessionController.status);

routes.post('/meal-sessions', MealSessionController.start);

routes.patch(
  '/meal-sessions/restart/:mealSessionId',
  MealSessionController.restart
);

routes.patch('/meal-sessions/:mealSessionId', MealSessionController.finish);

routes.post('/meal-sessions/:mealSessionId', MealSessionController.addStudent);

export default routes;
