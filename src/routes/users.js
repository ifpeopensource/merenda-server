import express from 'express';

import UserController from '../controllers/UserController.js';

import UserMiddleware from '../middlewares/UserMiddleware.js';

const routes = express.Router();

routes.use(UserMiddleware);

routes.post('/users/add', UserController.add);

routes.get('/users/read', UserController.read);

routes.put('/users/update', UserController.update);

routes.delete('/users/delete', UserController.del);

export default routes;
