import { z } from 'zod';

import MealSessionService from '#services/MealSessionService.js';
import StudentService from '#services/StudentService.js';

import { MealSessionFinishedError } from '#errors/MealSession/MealSessionFinished.js';
import { MealSessionNotFoundError } from '#errors/MealSession/MealSessionNotFound.js';
import { StudentAlreadyInMealSessionError } from '#errors/MealSession/StudentAlreadyInMealSession.js';
import { StudentNotFoundError } from '#errors/StudentNotFound.js';

import generateFormattedError from '#utils/generateFormattedError.js';

async function status(request, response) {
  const sessionIdSchema = z.string('').cuid('Invalid Session Id Format!');

  let id;

  try {
    id = sessionIdSchema.parse(request.params.mealSessionId);
  } catch (error) {
    return response.status(400).json(generateFormattedError(error));
  }

  try {
    return response.json(await MealSessionService.read(id));
  } catch (error) {
    if (error instanceof MealSessionNotFoundError) {
      return response.sendStatus(404);
    }

    console.error('Internal Server Error: ' + error);
    return response.sendStatus(500);
  }
}

async function start(_request, response) {
  try {
    return response.json(await MealSessionService.start());
  } catch (error) {
    console.error('Internal Server Error: ' + error);
    return response.sendStatus(500);
  }
}

async function restart(request, response) {
  const sessionIdSchema = z.string('').cuid('Invalid Session Id Format!');

  let id;

  try {
    id = sessionIdSchema.parse(request.params.mealSessionId);
  } catch (error) {
    return response.status(400).json(generateFormattedError(error));
  }

  try {
    return response.json(await MealSessionService.restart(id));
  } catch (error) {
    if (error instanceof MealSessionNotFoundError) {
      return response.sendStatus(404);
    }

    console.error('Internal Server Error: ' + error);
    return response.sendStatus(500);
  }
}

async function finish(request, response) {
  const sessionIdSchema = z.string('').cuid('Invalid Session Id Format!');

  let id;

  try {
    id = sessionIdSchema.parse(request.params.mealSessionId);
  } catch (error) {
    return response.status(400).json(generateFormattedError(error));
  }

  try {
    return response.json(await MealSessionService.finish(id));
  } catch (error) {
    if (error instanceof MealSessionNotFoundError) {
      return response.status(404).json({ error: { message: error.message } });
    }

    if (error instanceof MealSessionFinishedError) {
      return response.status(400).json({ error: { message: error.message } });
    }

    console.error('Internal Server Error: ' + error);
    return response.sendStatus(500);
  }
}

async function addStudent(request, response) {
  const mealSessionIdSchema = z
    .string()
    .cuid('Invalid Meal Session Id format!');
  const studentIdSchema = z
    .string()
    .min(12)
    .regex(/\d{5}.{2,5}\d{4}/g, 'Invalid Student Id Format!')
    .transform((val) => val.toUpperCase());

  const mealSessionId = request.params.mealSessionId;
  const studentId = request.body.studentId;

  const dataSchema = z.object({
    mealSessionId: mealSessionIdSchema,
    studentId: studentIdSchema,
  });

  let data;

  try {
    data = dataSchema.parse({ mealSessionId, studentId });
  } catch (error) {
    return response.status(400).json(generateFormattedError(error));
  }

  try {
    return response.json(await MealSessionService.addStudent(data));
  } catch (error) {
    if (error instanceof StudentNotFoundError) {
      return response.status(404).json({
        error: { message: error.message, details: 'student_not_found' },
      });
    }

    if (error instanceof MealSessionNotFoundError) {
      return response.status(404).json({
        error: { message: error.message, details: 'meal_session_not_found' },
      });
    }

    if (error instanceof MealSessionFinishedError) {
      return response.status(400).json({
        error: { message: error.message, details: 'meal_session_finished' },
      });
    }

    if (error instanceof StudentAlreadyInMealSessionError) {
      const studentInMealSession =
        await MealSessionService.verifyStudentInMealSession(data);

      return response.status(400).json({
        error: {
          message: error.message,
          details: 'student_already_in_meal_session',
        },
        student: studentInMealSession.student,
        servedAt: studentInMealSession.servedAt,
      });
    }

    console.error('Internal Server Error: ' + error);
    return response.sendStatus(500);
  }
}

async function verifyStudentInMealSession(request, response) {
  const mealSessionIdSchema = z.string().cuid('Invalid Session Format!');
  const studentIdSchema = z
    .string()
    .min(12)
    .regex(/\d{5}.{2,5}\d{4}/g, 'Invalid ID Format!')
    .transform((val) => val.toUpperCase());

  const mealSessionId = request.params.mealSessionId;
  const studentId = request.query.studentId;

  const dataSchema = z.object({
    mealSessionId: mealSessionIdSchema,
    studentId: studentIdSchema,
  });

  let data;

  try {
    data = dataSchema.parse({ mealSessionId, studentId });
  } catch (error) {
    return response.status(400).json(generateFormattedError(error));
  }

  if (!(await StudentService.read(studentId))) {
    return response.status(404).json({
      error: {
        message: 'Student not found!',
        details: 'student_not_found',
      },
    });
  }

  let studentInMealSession;

  try {
    studentInMealSession = await MealSessionService.verifyStudentInMealSession(
      data
    );
  } catch (error) {
    if (error instanceof MealSessionNotFoundError) {
      return response.status(404).json({
        error: { message: error.message, details: 'meal_session_not_found' },
      });
    }

    console.error('Internal Server Error: ' + error);
    return response.sendStatus(500);
  }

  if (!studentInMealSession) {
    return response.json({ available: true, servedAt: null });
  }

  return response.json({
    available: false,
    servedAt: studentInMealSession.servedAt,
  });
}

async function list(_request, response) {
  try {
    return response.json(await MealSessionService.list());
  } catch (error) {
    console.error('Internal Server Error: ' + error);
    return response.sendStatus(500);
  }
}

export default {
  status,
  start,
  restart,
  finish,
  addStudent,
  verifyStudentInMealSession,
  list,
};
