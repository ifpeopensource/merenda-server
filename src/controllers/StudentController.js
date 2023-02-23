import { z } from 'zod';

import StudentService from '#services/StudentService.js';

import { EntryExistsError } from '#errors/EntryExists.js';

import { sendStudentQRCodeEmail } from '#infra/email/messages/sendStudentQRCodeEmail.js';

import generateFormattedError from '#utils/generateFormattedError.js';

async function list(request, response) {
  try {
    const students = await StudentService.findAll();
    return response.json(students);
  } catch (error) {
    console.error('Internal Server Error: ' + error);
    return response.sendStatus(500);
  }
}

async function add(request, response) {
  const idSchema = z
    .string()
    .min(12)
    .regex(/\d{5}.{2,5}\d{4}/g, 'Invalid ID Format!')
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
    return response.status(400).json(generateFormattedError(error));
  }

  try {
    const student = await StudentService.add(data);
    sendStudentQRCodeEmail(student);
    return response.status(201).json(student);
  } catch (error) {
    if (error instanceof EntryExistsError) {
      return response.status(400).json({ error: { message: error.message } });
    } else {
      console.error('Internal Server Error: ' + error);
      return response.sendStatus(500);
    }
  }
}

async function read(request, response) {
  const idSchema = z
    .string()
    .min(12)
    .regex(/\d{5}.{2,5}\d{4}/g, 'Invalid ID Format!')
    .transform((val) => val.toUpperCase());

  let id;

  try {
    id = idSchema.parse(request.params.id);
  } catch (error) {
    return response.status(400).json(generateFormattedError(error));
  }

  const student = await StudentService.read(id);

  if (student) {
    return response.json({ student });
  } else {
    return response.sendStatus(404);
  }
}

async function update(request, response) {
  const idSchema = z
    .string()
    .min(12)
    .regex(/\d{5}.{2,5}\d{4}/g, 'Invalid ID Format!')
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
    return response.status(400).json(generateFormattedError(error));
  }

  try {
    const student = await StudentService.update(id, data);
    return response.json(student);
  } catch (error) {
    return response.sendStatus(404);
  }
}

async function del(request, response) {
  const idSchema = z
    .string()
    .min(12)
    .regex(/\d{5}.{2,5}\d{4}/g, 'Invalid ID Format!')
    .transform((val) => val.toUpperCase());

  let id;

  try {
    id = idSchema.parse(request.params.id);
  } catch (error) {
    return response.status(400).json(generateFormattedError(error));
  }

  try {
    await StudentService.del(id);
    return response.sendStatus(204);
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
    return response.status(400).json(generateFormattedError(error));
  }

  const student = await StudentService.read(email, true);

  if (student) {
    return response.json({ student });
  } else {
    return response.sendStatus(404);
  }
}

export default { list, add, read, update, del, find };
