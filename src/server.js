import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import oauthRoute from './routes/oauth.js';
import studentsRoute from './routes/students.js';
import usersRoute from './routes/users.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(oauthRoute);
app.use(studentsRoute);
app.use(usersRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
