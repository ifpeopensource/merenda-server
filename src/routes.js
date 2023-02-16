import express from 'express';

import StudentController from './controllers/StudentController.js';

import UserMiddleware from './middlewares/UserMiddleware.js';

const routes = express.Router();

routes.get('/students', UserMiddleware, StudentController.list);

routes.post('/students/add', UserMiddleware, StudentController.add);

routes.get('/students/read', UserMiddleware, StudentController.read);

routes.put('/students/update', UserMiddleware, StudentController.update);

routes.delete('/students/delete', UserMiddleware, StudentController.del);

export default routes;
