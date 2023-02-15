import express from 'express';

import UserController from './controllers/UserController.js';

const routes = express.Router();

routes.get('/users', UserController.list);

export default routes;
