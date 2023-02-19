import StudentService from '../services/StudentService.js';

import { z } from 'zod';

async function list(_request, response) {
  if (_request.role == 'STUDENT') {
    return response.sendStatus(403);
  }

  try {
    const students = await StudentService.findAll();
    return response.json(students);
  } catch (error) {
    return response.status(500).json({ error: error });
  }
}

async function add(_request, response) {
  if (_request.role != 'ADMIN') {
    return response.sendStatus(403);
  }

  const idSchema = z
    .string()
    .min(12)
    .regex(new RegExp('\\d{5}.{2,5}\\d{4}'))
    .transform((val) => val.toUpperCase());
  const emailSchema = z.string().email();
  const picSchema = z.string().url();
  const nameSchema = z.string();

  const { id, name, email, picUrl } = _request.body;

  if (!idSchema.safeParse(id).success) {
    return response.status(400).json({ error: 'Malformed ID!' });
  }
  if (!emailSchema.safeParse(email).success) {
    return response.status(400).json({ error: 'Malformed Email!' });
  }
  if (!picSchema.safeParse(picUrl).success) {
    return response.status(400).json({ error: 'Malformed PicUrl!' });
  }
  if (!nameSchema.safeParse(name).success) {
    return response.status(400).json({ error: 'Malformed Name!' });
  }

  const data = { id: id, name: name, email: email, picUrl: picUrl };

  try {
    const student = await StudentService.add(data);
    return response.status(201).json(student);
  } catch (error) {
    if (error.code == 'P2002') {
      return response.status(204).send();
    } else {
      return response
        .status(500)
        .json({ error: error.message, code: error.code });
    }
  }
}

async function read(_request, response) {
  if (_request.role == 'STUDENT') {
    return response.sendStatus(403);
  }

  const emailSchema = z.string().email();
  const idSchema = z
    .string()
    .min(12)
    .regex(new RegExp('\\d{5}.{2,5}\\d{4}'))
    .transform((val) => val.toUpperCase());

  const query = _request.query.q;

  let type;

  if (idSchema.safeParse(query).success) {
    type = 0;
  } else if (emailSchema.safeParse(query).success) {
    type = 1;
  } else {
    return response.status(400).json({ error: 'Malformed Query!' });
  }

  const student = await StudentService.read(query, type);

  if (student) {
    return response.json({ data: student });
  } else {
    return response.sendStatus(404);
  }
}

async function update(_request, response) {
  if (_request.role != 'ADMIN') {
    return response.sendStatus(403);
  }

  const idSchema = z
    .string()
    .min(12)
    .regex(new RegExp('\\d{5}.{2,5}\\d{4}'))
    .transform((val) => val.toUpperCase());
  const emailSchema = z.string().email();
  const picSchema = z.string().url();
  const nameSchema = z.string();

  const { id, email, picUrl, name } = _request.body;

  if (!idSchema.safeParse(id).success) {
    return response.status(400).json({ error: 'Malformed ID!' });
  }
  if (!emailSchema.safeParse(email).success) {
    return response.status(400).json({ error: 'Malformed Email!' });
  }
  if (!picSchema.safeParse(picUrl).success) {
    return response.status(400).json({ error: 'Malformed PicUrl!' });
  }
  if (!nameSchema.safeParse(name).success) {
    return response.status(400).json({ error: 'Malformed Name!' });
  }

  const data = { name: name, email: email, picUrl: picUrl };

  try {
    const student = await StudentService.update(id, data);
    return response.json(student);
  } catch (error) {
    return response.sendStatus(404);
  }
}

async function del(_request, response) {
  if (_request.role != 'ADMIN') {
    return response.sendStatus(403);
  }

  const idSchema = z
    .string()
    .min(12)
    .regex(new RegExp('\\d{5}.{2,5}\\d{4}'))
    .transform((val) => val.toUpperCase());

  const id = _request.query.id;

  if (!idSchema.safeParse(id).success) {
    return response.status(400).json({ error: 'Malformed ID!' });
  }

  try {
    await StudentService.del(id);
    return response.status(204).send();
  } catch (error) {
    return response.sendStatus(404);
  }
}

export default { list, add, read, update, del };
