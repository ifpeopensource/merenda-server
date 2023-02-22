import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import oauthRoutes from './routes/oauth.js';
import studentsRoutes from './routes/students.js';
import usersRoutes from './routes/users.js';

import { formattedSendStatus } from './utils/sendStatusJSONFormatter.js';

const app = express();
app.response.sendStatus = formattedSendStatus;

app.use(cors());
app.use(express.json());

app.use(oauthRoutes);
app.use(studentsRoutes);
app.use(usersRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
