import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { EntryExists } from '../errors/EntryExists.js';

import StudentService from '../services/StudentService.js';

async function list(request, response) {
  if (request.role == 'STUDENT') {
    return response.sendStatus(403);
  }

  try {
    const students = await StudentService.findAll();
    return response.json(students);
  } catch (error) {
    return response.status(500).json({ error: error });
  }
}

async function add(request, response) {
  if (request.role != 'ADMIN') {
    return response.sendStatus(403);
  }

  const idSchema = z
    .string()
    .min(12)
    .regex(/\d{5}.{2,5}\d{4}/g)
    .transform((val) => val.toUpperCase());
  const emailSchema = z.string().email();
  const picSchema = z.string().url();
  const nameSchema = z.string();

  const bodySchema = z.object({
    id: idSchema,
    email: emailSchema,
    picUrl: picSchema,
    name: nameSchema,
  });

  let data;

  try {
    data = bodySchema.parse(request.body);
  } catch (error) {
    return response.status(400).json(fromZodError(error));
  }

  try {
    const student = await StudentService.add(data);
    return response.status(201).json(student);
  } catch (error) {
    if (error instanceof EntryExists) {
      return response.sendStatus(400);
    } else {
      return response
        .status(500)
        .json({ error: error.message, code: error.code });
    }
  }
}

async function read(request, response) {
  if (request.role == 'STUDENT') {
    return response.sendStatus(403);
  }

  const idSchema = z
    .string()
    .min(12)
    .regex(/\d{5}.{2,5}\d{4}/g)
    .transform((val) => val.toUpperCase());

  let id;

  try {
    id = idSchema.parse(request.params.id);
  } catch (error) {
    return response.status(400).json(fromZodError(error));
  }

  const student = await StudentService.read(id, 0);

  if (student) {
    return response.json({ data: student });
  } else {
    return response.sendStatus(404);
  }
}

async function update(request, response) {
  if (request.role != 'ADMIN') {
    return response.sendStatus(403);
  }

  const idSchema = z
    .string()
    .min(12)
    .regex(/\d{5}.{2,5}\d{4}/g)
    .transform((val) => val.toUpperCase());
  const emailSchema = z.string().email();
  const picSchema = z.string().url();
  const nameSchema = z.string();

  const bodySchema = z.object({
    email: emailSchema,
    picUrl: picSchema,
    name: nameSchema,
  });

  let id, data;

  try {
    id = idSchema.parse(request.params.id);
    data = bodySchema.parse(request.body);
  } catch (error) {
    return response.status(400).json(fromZodError(error));
  }

  try {
    const student = await StudentService.update(id, data);
    return response.json(student);
  } catch (error) {
    return response.sendStatus(404);
  }
}

async function del(request, response) {
  if (request.role != 'ADMIN') {
    return response.sendStatus(403);
  }

  const idSchema = z
    .string()
    .min(12)
    .regex(/\d{5}.{2,5}\d{4}/g)
    .transform((val) => val.toUpperCase());

  let id;

  try {
    id = idSchema.parse(request.params.id);
  } catch (error) {
    return response.status(400).json({ error: 'Invalid ID Format!' });
  }

  try {
    await StudentService.del(id);
    return response.status(204).send();
  } catch (error) {
    return response.sendStatus(404);
  }
}

async function find(request, response) {
  const emailSchema = z.string().email();

  let email;

  try {
    email = emailSchema.parse(request.query.email);
  } catch (error) {
    response.status(400).json(fromZodError(error));
  }

  const student = await StudentService.read(email, 1);

  if (student) {
    return response.json({ student: student });
  } else {
    return response.sendStatus(404);
  }
}

export default { list, add, read, update, del, find };
