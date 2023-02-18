import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

async function createToken(password, user) {
  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid Crendentials!');
  }

  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

export default { createToken };
