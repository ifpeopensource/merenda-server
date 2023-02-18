import express from 'express';

import StudentController from '../controllers/StudentController.js';

import StudentMiddleware from '../middlewares/StudentMiddleware.js';

const routes = express.Router();

routes.use(StudentMiddleware);

routes.get('/students', StudentController.list);

routes.post('/students/add', StudentController.add);

routes.get('/students/read', StudentController.read);

routes.put('/students/update', StudentController.update);

routes.delete('/students/delete', StudentController.del);

export default routes;
