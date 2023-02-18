import express from 'express';

import OauthController from '../controllers/OauthController.js';


const routes = express.Router();

routes.post('/oauth/login', OauthController.login);

export default routes;
