import UserService from '../services/UserService.js';


import bcrypt from 'bcrypt';

import { z } from 'zod';


async function add(_request, response) {
    const emailSchema = z.string().email();
    const nameSchema = z.string();
    // Regex Magic to validate that password is strong
    const passSchema = z.string().regex(new RegExp('^(?=.*[0-9])(?=.*[-?/|{}=!@#$%^&*]).{8,32}$'));    
    const roleSchema = z.enum(['USER', 'VERIFIER', 'ADMIN']);

    const { email, name } = _request.body;
    
    const plain_password = _request.body.password;

    let { role } = _request.body;


    if (!emailSchema.safeParse(email).success) {
        response.status(400).json({ error:'Malformed Email!' });
        return;
    }
    if (!nameSchema.safeParse(name).success) {
        response.status(400).json({ error:'Malformed Name!' });
        return;
    }
    if (!passSchema.safeParse(plain_password).success) {
        response.status(400).json({ error:'Malformed Password!' });
        return;
    }
    if (!roleSchema.safeParse(role).success) {
        role = 'VERIFIER';
    }

    const password = await bcrypt.hash(plain_password, 10);

    const data = { name, password, email, role};

    await UserService.add(data)
        .then((user) => {
            response.status(201).json(user);
        }).catch((err) => { 
            if (err.code == 'P2002') {
                response.status(204).send();
            } else {
                response.status(500).json({ error:err.message, code:err.code });
            }
        });
}

async function read(_request, response) {
    const emailSchema = z.string().email();
    
    if (!emailSchema.safeParse(_request.query.email).success) {
        response.status(400).json({ error:'Malformed Email!' });
        return;
    }

    const email = _request.query.email;

    await UserService.read(email)
        .then( (user) => {
            if (user){
                response.json({ 'data': user });
            } else {
                response.sendStatus(404);
            }
        });
}

async function update(_request, response) {
    const emailSchema = z.string().email();
    const nameSchema = z.string();
    // Regex Magic to validate that password is strong
    const passSchema = z.string().regex(new RegExp('^(?=.*[0-9])(?=.*[-?/|{}=!@#$%^&*]).{8,32}$'));
    const roleSchema = z.enum(['USER', 'VERIFIER', 'ADMIN']);

    const { name, role, email } = _request.body;
    const plain_password = _request.body.password;

    let data = {};
    
    if (!emailSchema.safeParse(email).success) {
        response.status(400).json({ error:'Malformed Email!' });
        return;
    }
    if (!nameSchema.safeParse(name).success) {
        response.status(400).json({ error:'Malformed Email!' });
        return;
    }
    if (!passSchema.safeParse(plain_password).success) {
        response.status(400).json({ error:'Malformed Password!' });
        return;
    }
       
    const password = await bcrypt.hash(plain_password, 10);
    
    if (roleSchema.safeParse(role).success) {
        data = { name: name, password: password, role: role };
    } else {
        data = { name: name, password: password };
    } 

    await UserService.update(email, data)
        .then((user) => {
            response.json(user);
        }).catch(() => {
            response.sendStatus(404);
        });
}

async function del(_request, response) {
    const emailSchema = z.string().email();

    const email = _request.query.email;

    if (!emailSchema.safeParse(email).success) {
        response.status(400).json({ error:'Malformed Email!' });
        return;
    }

    await UserService.del(email)
        .then(() => {
            response.status(204).send();
        }).catch(() => {
            response.sendStatus(404);
        });
}

export default { add, read, update, del };
