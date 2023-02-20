import { z } from 'zod';

import { InvalidPassword } from '../errors/InvalidPassword.js';

import OauthService from '../services/OauthService.js';
import UserService from '../services/UserService.js';

import generateFormattedError from '../utils/generateFormattedError.js';

async function login(request, response) {
  const emailSchema = z.string().email();

  try {
    emailSchema.parse(request.body.email);
  } catch (error) {
    return response.status(400).json(generateFormattedError(error));
  }

  const user = await UserService.getAuthData(request.body.email);

  if (!user) {
    return response
      .status(401)
      .json({ error: { message: 'Invalid Credentials!' } });
  }

  const { password } = request.body;

  try {
    const token = await OauthService.createToken(password, user);
    return response
      .set({ 'Cache-Control': 'no-store' })
      .json({ access_token: token, token_type: 'Bearer' });
  } catch (error) {
    if (error instanceof InvalidPassword) {
      return response.status(401).json({ error: { message: error.message } });
    }
    return response
      .status(500)
      .json({ error: { message: error.message, details: error } });
  }
}

export default { login };
