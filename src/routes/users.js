import express from 'express';

import UserController from '../controllers/UserController.js';

import UserMiddleware from '../middlewares/UserMiddleware.js';

const routes = express.Router();

routes.use(UserMiddleware);

routes.post('/users', UserController.add);

routes.get('/users/:email', UserController.read);

routes.put('/users/:email', UserController.update);

routes.delete('/users/:email', UserController.del);

export default routes;
