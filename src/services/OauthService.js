import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { InvalidPasswordError } from '#errors/InvalidPassword.js';

async function createToken(password, user) {
  if (!(await bcrypt.compare(password, user.password))) {
    throw new InvalidPasswordError();
  }

  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

export default { createToken };
