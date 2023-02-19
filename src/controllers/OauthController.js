import { z } from 'zod';

import OauthService from '../services/OauthService.js';

import UserService from '../services/UserService.js';

async function login(_request, response) {
  const emailSchema = z.string().email();

  if (!emailSchema.safeParse(_request.body.email).success) {
    return response.status(400).json({ error: 'Invalid Email Format!' });
  }

  const user = await UserService.read(_request.body.email);

  if (!user) {
    return response.status(401).json({ error: 'Invalid Credentials!' });
  }

  const { password } = _request.body;

  try {
    const token = await OauthService.createToken(password, user);
    return response
      .set({ 'Cache-Control': 'no-store' })
      .status(200)
      .json({ access_token: token, token_type: 'Bearer' });
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
}

export default { login };
