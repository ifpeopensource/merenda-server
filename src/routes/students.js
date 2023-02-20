import express from 'express';

import StudentController from '../controllers/StudentController.js';

import StudentMiddleware from '../middlewares/StudentMiddleware.js';

const routes = express.Router();

routes.use(StudentMiddleware);

routes.get('/students/find-by-email', StudentController.find);

routes.get('/students', StudentController.list);

routes.post('/students', StudentController.add);

routes.get('/students/:id', StudentController.read);

routes.put('/students/:id', StudentController.update);

routes.delete('/students/:id', StudentController.del);

export default routes;
