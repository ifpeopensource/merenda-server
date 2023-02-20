import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { InvalidPassword } from '../errors/InvalidPassword.js';

async function createToken(password, user) {
  if (!(await bcrypt.compare(password, user.password))) {
    throw new InvalidPassword();
  }

  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

export default { createToken };
