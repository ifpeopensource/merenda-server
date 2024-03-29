// eslint-disable-next-line import/order
import dotenv from 'dotenv';

// eslint-disable-next-line import/order
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimiter from 'express-rate-limit';

import mealSessionsRoutes from '#routes/mealSessions.js';
import oauthRoutes from '#routes/oauth.js';
import studentsRoutes from '#routes/students.js';
import usersRoutes from '#routes/users.js';

import { formattedSendStatus } from '#utils/sendStatusJSONFormatter.js';
dotenv.config();

const app = express();
app.response.sendStatus = formattedSendStatus;

const rateLimit = rateLimiter({
  windowMs: process.env.RATE_WINDOW_MINUTES * 60 * 1000, // x minutes * 60 secs * 1000 ms = time in ms
  max: process.env.RATE_MAX_REQS,
  message: { error: { message: 'Too many requests, try again later!' } },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors({ credentials: true, origin: process.env.WEBAPP_HOST }));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit);

app.use(oauthRoutes);
app.use(studentsRoutes);
app.use(usersRoutes);
app.use(mealSessionsRoutes);

app.listen(process.env.API_PORT || 3000, () => {
  console.log('Server is running on port', process.env.API_PORT);
});
