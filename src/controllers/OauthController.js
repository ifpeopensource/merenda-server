import { z } from 'zod';

import { InvalidPassword } from '../errors/InvalidPassword.js';

import OauthService from '../services/OauthService.js';
import UserService from '../services/UserService.js';

async function login(request, response) {
  const emailSchema = z.string().email();

  if (!emailSchema.safeParse(request.body.email).success) {
    return response.status(400).json({ error: 'Invalid Email Format!' });
  }

  const user = await UserService.getHash(request.body.email);

  if (!user) {
    return response.status(401).json({ error: 'Invalid Credentials!' });
  }

  const { password } = request.body;

  try {
    const token = await OauthService.createToken(password, user);
    return response
      .set({ 'Cache-Control': 'no-store' })
      .status(200)
      .json({ access_token: token, token_type: 'Bearer' });
  } catch (error) {
    if (error instanceof InvalidPassword) {
      return response.status(401).json({ error: error.message });
    }
    return response.status(500).json({ error: error.message });
  }
}

export default { login };
