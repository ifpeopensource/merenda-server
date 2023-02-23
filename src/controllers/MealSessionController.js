import { z } from 'zod';

import MealSessionService from '#services/MealSessionService.js';

import { SessionClosedError } from '#errors/SessionClosed.js';
import { StudentInexistentError } from '#errors/StudentInexistent.js';

import generateFormattedError from '#utils/generateFormattedError.js';

async function addStudent(request, response) {
  const sessionIdSchema = z.string().cuid('Invalid Session Format!');
  const studentIdSchema = z
    .string()
    .min(12)
    .regex(/\d{5}.{2,5}\d{4}/g, 'Invalid ID Format!')
    .transform((val) => val.toUpperCase());

  const sessionId = request.params.sessionId;
  const studentId = request.body.studentId;

  const dataSchema = z.object({
    sessionId: sessionIdSchema,
    studentId: studentIdSchema,
  });

  let data;

  try {
    data = dataSchema.parse({ sessionId, studentId });
  } catch (error) {
    return response.status(400).json(generateFormattedError(error));
  }

  let session;
  try {
    session = await MealSessionService.read(sessionId);
  } catch (error) {
    if (error instanceof SessionClosedError) {
      return response
        .sendStatus(400)
        .json({ error: { message: error.message } });
    } else {
      console.error('Internal Server Error: ' + error);
      return response.sendStatus(500);
    }
  }

  if (!session) {
    return response.sendStatus(404);
  }

  try {
    return response.json(await MealSessionService.add(data));
  } catch (error) {
    if (error instanceof StudentInexistentError) {
      return response.status(400).json({ error: { message: error.message } });
    }
    console.error('Internal Server Error: ' + error);
    return response.sendStatus(500);
  }
}

async function startSession(_request, response) {
  try {
    return response.json(await MealSessionService.start());
  } catch (error) {
    console.error('Internal Server Error: ' + error);
    return response.sendStatus(500);
  }
}

async function closeSession(request, response) {
  const sessionIdSchema = z.string().cuid('Invalid Session Format!');

  let id;

  try {
    id = sessionIdSchema.parse(request.params.sessionId);
  } catch (error) {
    return response.status(400).json(generateFormattedError(error));
  }

  try {
    return response.json(
      await MealSessionService.close(id, new Date(Date.now()))
    );
  } catch (error) {
    return response.sendStatus(404);
  }
}

async function verifyStudent(request, response) {
  const sessionIdSchema = z.string().cuid('Invalid Session Format!');
  const studentIdSchema = z
    .string()
    .min(12)
    .regex(/\d{5}.{2,5}\d{4}/g, 'Invalid ID Format!')
    .transform((val) => val.toUpperCase());

  const dataSchema = z.object({
    sessionId: sessionIdSchema,
    studentId: studentIdSchema,
  });

  let data;

  try {
    data = dataSchema.parse(request.params);
  } catch (error) {
    return response.status(400).json(generateFormattedError(error));
  }

  let session;

  try {
    session = await MealSessionService.verify(data);
  } catch (error) {
    if (error instanceof SessionClosedError) {
      return response
        .sendStatus(400)
        .json({ error: { message: error.message } });
    } else {
      console.error('Internal Server Error: ' + error);
      return response.sendStatus(500);
    }
  }

  if (!session) {
    return response.sendStatus(404);
  }

  let available = true;
  let servedAt;
  console.log(session);
  session.students.forEach((student) => {
    console.log(student);
    if (student.studentId == data.studentId) {
      available = false;
      servedAt = student.servedAt;
    }
  });

  return response.json({ available, servedAt });
}

export default { addStudent, startSession, closeSession, verifyStudent };
