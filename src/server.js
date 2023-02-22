import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import oauthRoutes from './routes/oauth.js';
import studentsRoutes from './routes/students.js';
import usersRoutes from './routes/users.js';

import { setSendStatusFormat } from './utils/sendStatusJSONFormatter.js';

const app = express();

app.use(cors());
app.use(express.json());

setSendStatusFormat(app);

app.use(oauthRoutes);
app.use(studentsRoutes);
app.use(usersRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
