import { z } from 'zod';

import OauthService from '#services/OauthService.js';
import UserService from '#services/UserService.js';

import { InvalidPasswordError } from '#errors/oAuth/InvalidPassword.js';

import generateFormattedError from '#utils/generateFormattedError.js';

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
      .cookie('access-token', 'Bearer ' + token, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ access_token: token, token_type: 'Bearer' });
  } catch (error) {
    if (error instanceof InvalidPasswordError) {
      return response.status(401).json({ error: { message: error.message } });
    }
    console.error('Internal Server Error: ' + error);
    return response.sendStatus(500);
  }
}

async function logout(_request, response) {
  response
    .clearCookie('access-token', {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .json({ success: { message: 'You logged out successfully!' } });
}

async function verify(_request, response) {
  response.json({ success: { message: 'You are logged in!' } });
}

export default { login, logout, verify };
