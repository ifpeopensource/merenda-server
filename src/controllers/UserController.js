import bcrypt from 'bcrypt';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { EntryExists } from '../errors/EntryExists.js';

import UserService from '../services/UserService.js';

async function add(request, response) {
  const emailSchema = z.string().email();
  const nameSchema = z.string();
  // Regex Magic to validate that password is strong
  const passSchema = z
    .string()
    .regex(/^(?=.*[0-9])(?=.*[-?/|{}=!@#$%^&*]).{8,32}$/g)
    .transform(async (val) => await bcrypt.hash(val, 10));
  const roleSchema = z.enum(['USER', 'VERIFIER', 'ADMIN']).catch('VERIFIER');

  const bodySchema = z.object({
    password: passSchema,
    email: emailSchema,
    role: roleSchema,
    name: nameSchema,
  });

  let data;

  try {
    data = await bodySchema.parseAsync(request.body);
  } catch (error) {
    return response.status(400).json(fromZodError(error));
  }

  try {
    const user = await UserService.add(data);
    return response.status(201).json(user);
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
  const emailSchema = z.string().email();

  let email;

  try {
    email = emailSchema.parse(request.params.email);
  } catch (error) {
    return response.status(400).json(fromZodError(error));
  }

  const user = await UserService.read(email);

  if (user) {
    return response.json({ user: user });
  } else {
    return response.sendStatus(404);
  }
}

async function update(request, response) {
  const emailSchema = z.string().email();
  const nameSchema = z.string();
  // Regex Magic to validate that password is strong
  const passSchema = z
    .string()
    .regex(/^(?=.*[0-9])(?=.*[-?/|{}=!@#$%^&*]).{8,32}$/g)
    .transform(async (val) => await bcrypt.hash(val, 10));
  const roleSchema = z.enum(['USER', 'VERIFIER', 'ADMIN']);

  const bodySchema = z.object({
    password: passSchema,
    role: roleSchema,
    name: nameSchema,
  });

  let data, email;

  try {
    data = await bodySchema.parseAsync(request.body);
    email = emailSchema.parse(request.params.email);
  } catch (error) {
    return response.status(400).json(fromZodError(error));
  }

  try {
    const user = await UserService.update(email, data);
    return response.json(user);
  } catch (error) {
    return response.sendStatus(404);
  }
}

async function del(request, response) {
  const emailSchema = z.string().email();

  let email;

  try {
    email = emailSchema.parse(request.params.email);
  } catch (error) {
    response.status(400).json(fromZodError(error));
  }

  try {
    await UserService.del(email);
    return response.status(204).send();
  } catch (error) {
    return response.sendStatus(404);
  }
}

export default { add, read, update, del };
