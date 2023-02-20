import express from 'express';

import StudentController from '../controllers/StudentController.js';

import AuthMiddleware from '../middlewares/AdminMiddleware.js';
import RequireAdminMiddleware from '../middlewares/RequireAdminMiddleware.js';
import RequireVerifierMiddleware from '../middlewares/RequireVerifierMiddleware.js';

const routes = express.Router();

routes.use(AuthMiddleware);

routes.get(
  '/students/find-by-email',
  RequireVerifierMiddleware,
  StudentController.find
);

routes.get('/students', RequireVerifierMiddleware, StudentController.list);

routes.post('/students', RequireAdminMiddleware, StudentController.add);

routes.get('/students/:id', RequireVerifierMiddleware, StudentController.read);

routes.put('/students/:id', RequireAdminMiddleware, StudentController.update);

routes.delete('/students/:id', RequireAdminMiddleware, StudentController.del);

export default routes;
