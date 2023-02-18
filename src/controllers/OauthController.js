import { z } from 'zod';

import OauthService from '../services/OauthService.js';

import UserService from '../services/UserService.js';


async function login(_request, response) {
    const emailSchema = z.string().email();

    if (!emailSchema.safeParse(_request.body.email).success) {
        response.status(400).json({ error:'Invalid Email Format!'});
        return;
    }

    const user = await UserService.read(_request.body.email);
    
    if (!user) {
        response.status(401).json({ error:'Invalid Credentials!' });
        return;
    }

    const { password } = _request.body;

    await OauthService.createToken(password, user)
        .then((token) => {
            response.set({'Cache-Control': 'no-store'}).status(200).json({'access_token': token, 'token_type': 'Bearer'});
        }).catch((err) => {
            response.status(401).json({ error:err.message });
        });
}


export default { login };
