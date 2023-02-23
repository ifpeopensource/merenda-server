import express from 'express';

import AuthMiddleware from '#middlewares/AuthMiddleware.js';
import RequireAdminMiddleware from '#middlewares/RequireAdminMiddleware.js';

import UserController from '#controllers/UserController.js';

const routes = express.Router();

routes.use('/users', AuthMiddleware);
routes.use('/users', RequireAdminMiddleware);

routes.post('/users', UserController.add);

routes.get('/users/:email', UserController.read);

routes.put('/users/:email', UserController.update);

routes.delete('/users/:email', UserController.del);

export default routes;
