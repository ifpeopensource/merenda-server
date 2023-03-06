import express from 'express';

import AuthMiddleware from '#middlewares/AuthMiddleware.js';

import OauthController from '#controllers/OauthController.js';

const routes = express.Router();

routes.post('/oauth/login', OauthController.login);

routes.post('/oauth/logout', AuthMiddleware, OauthController.logout);

routes.get('/oauth/verify', AuthMiddleware, OauthController.verify);

export default routes;
