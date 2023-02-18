import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import routes from './routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
