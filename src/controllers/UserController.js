import UserService from '../services/UserService.js';

import bcrypt from 'bcrypt';

import { z } from 'zod';

async function add(_request, response) {
  const emailSchema = z.string().email();
  const nameSchema = z.string();
  // Regex Magic to validate that password is strong
  const passSchema = z
    .string()
    .regex(new RegExp('^(?=.*[0-9])(?=.*[-?/|{}=!@#$%^&*]).{8,32}$'));
  const roleSchema = z.enum(['USER', 'VERIFIER', 'ADMIN']);

  const { email, name } = _request.body;

  const plain_password = _request.body.password;

  let { role } = _request.body;

  if (!emailSchema.safeParse(email).success) {
    return response.status(400).json({ error: 'Malformed Email!' });
  }
  if (!nameSchema.safeParse(name).success) {
    return response.status(400).json({ error: 'Malformed Name!' });
  }
  if (!passSchema.safeParse(plain_password).success) {
    return response.status(400).json({ error: 'Malformed Password!' });
  }
  if (!roleSchema.safeParse(role).success) {
    role = 'VERIFIER';
  }

  const password = await bcrypt.hash(plain_password, 10);

  const data = { name, password, email, role };

  try {
    const user = await UserService.add(data);
    return response.status(201).json(user);
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
  const emailSchema = z.string().email();

  if (!emailSchema.safeParse(_request.query.email).success) {
    return response.status(400).json({ error: 'Malformed Email!' });
  }

  const email = _request.query.email;

  const user = await UserService.read(email);

  if (user) {
    return response.json({ data: user });
  } else {
    return response.sendStatus(404);
  }
}

async function update(_request, response) {
  const emailSchema = z.string().email();
  const nameSchema = z.string();
  // Regex Magic to validate that password is strong
  const passSchema = z
    .string()
    .regex(new RegExp('^(?=.*[0-9])(?=.*[-?/|{}=!@#$%^&*]).{8,32}$'));
  const roleSchema = z.enum(['USER', 'VERIFIER', 'ADMIN']);

  const { name, role, email } = _request.body;
  const plain_password = _request.body.password;

  let data = {};

  if (!emailSchema.safeParse(email).success) {
    return response.status(400).json({ error: 'Malformed Email!' });
  }
  if (!nameSchema.safeParse(name).success) {
    return response.status(400).json({ error: 'Malformed Email!' });
  }
  if (!passSchema.safeParse(plain_password).success) {
    return response.status(400).json({ error: 'Malformed Password!' });
  }

  const password = await bcrypt.hash(plain_password, 10);

  if (roleSchema.safeParse(role).success) {
    data = { name: name, password: password, role: role };
  } else {
    data = { name: name, password: password };
  }

  try {
    const user = await UserService.update(email, data);
    return response.json(user);
  } catch (error) {
    return response.sendStatus(404);
  }
}

async function del(_request, response) {
  const emailSchema = z.string().email();

  const email = _request.query.email;

  if (!emailSchema.safeParse(email).success) {
    return response.status(400).json({ error: 'Malformed Email!' });
  }

  try {
    await UserService.del(email);
    return response.status(204).send();
  } catch (error) {
    return response.sendStatus(404);
  }
}

export default { add, read, update, del };
