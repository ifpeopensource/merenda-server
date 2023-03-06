// eslint-disable-next-line import/order
import dotenv from 'dotenv';

// eslint-disable-next-line import/order
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import mealSessionsRoutes from '#routes/mealSessions.js';
import oauthRoutes from '#routes/oauth.js';
import studentsRoutes from '#routes/students.js';
import usersRoutes from '#routes/users.js';

import { formattedSendStatus } from '#utils/sendStatusJSONFormatter.js';
dotenv.config();

const app = express();
app.response.sendStatus = formattedSendStatus;

app.use(cors({ crendentials: true, origin: process.env.WEBAPP_HOST }));
app.use(express.json());
app.use(cookieParser());

app.use(oauthRoutes);
app.use(studentsRoutes);
app.use(usersRoutes);
app.use(mealSessionsRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
