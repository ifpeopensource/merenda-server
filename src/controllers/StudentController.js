import StudentService from '../services/StudentService.js';

import { z } from 'zod';


async function list(_request, response) {
    if (_request.role == 'STUDENT') {
        response.sendStatus(403);
        return;
    }

    await StudentService.findAll()
        .then((students) => {
            response.json(students);
        }).catch((err) => {
            response.status(500).json({ error: err });
        });
}

async function add(_request, response) {
    if (_request.role != 'ADMIN') {
        response.sendStatus(403);
        return;
    }

    const idSchema = z.string().min(12).regex(new RegExp('\\d{5}.{2,5}\\d{4}')).transform((val) => val.toUpperCase());
    const emailSchema = z.string().email();
    const picSchema = z.string().url();
    const nameSchema = z.string();
    
    const { id, name, email, picUrl } = _request.body;

    if (!idSchema.safeParse(id).success) {
        response.status(400).json({ error:'Malformed ID!' });
        return;
    }
    if (!emailSchema.safeParse(email).success) {
        response.status(400).json({ error:'Malformed Email!' });
        return;
    }
    if (!picSchema.safeParse(picUrl).success) {
        response.status(400).json({ error:'Malformed PicUrl!' });
        return;
    }
    if (!nameSchema.safeParse(name).success) {
        response.status(400).json({ error:'Malformed Name!' });
        return;
    }

    const data = { id: id, name: name, email: email, picUrl: picUrl };

    await StudentService.add(data)
        .then((student) => {
            response.status(201).json(student);
        }).catch((err) => { 
            if (err.code == 'P2002') {
                response.status(204).send();
            } else {
                response.status(500).json({ error:err.message, code:err.code });
            }
        });
}

async function read(_request, response) {
    if (_request.role == 'STUDENT') {
        response.sendStatus(403);
        return;
    }

    const emailSchema = z.string().email();
    const idSchema = z.string().min(12).regex(new RegExp('\\d{5}.{2,5}\\d{4}')).transform((val) => val.toUpperCase());

    const query = _request.query.q;
    
    let type;

    if (idSchema.safeParse(query).success) {
        type = 0;
    } else if(emailSchema.safeParse(query).success) {
        type = 1;
    } else {
        response.status(400).json({ error: 'Malformed Query!'});
        return;
    }

    await StudentService.read(query, type)
        .then((student) => {
            if (student){
                response.json({ 'data': student });
            } else {
                response.sendStatus(404);
            }
        });
}

async function update(_request, response) {
    if (_request.role != 'ADMIN') {
        response.sendStatus(403);
        return;
    }

    const idSchema = z.string().min(12).regex(new RegExp('\\d{5}.{2,5}\\d{4}')).transform((val) => val.toUpperCase());
    const emailSchema = z.string().email();
    const picSchema = z.string().url();
    const nameSchema = z.string();
    
    const { id, email, picUrl, name } = _request.body;

    if (!idSchema.safeParse(id).success) {
        response.status(400).json({ error:'Malformed ID!' });
        return;
    }
    if (!emailSchema.safeParse(email).success) {
        response.status(400).json({ error:'Malformed Email!' });
        return;
    }
    if (!picSchema.safeParse(picUrl).success) {
        response.status(400).json({ error:'Malformed PicUrl!' });
        return;
    }
    if (!nameSchema.safeParse(name).success) {
        response.status(400).json({ error:'Malformed Name!' });
        return;
    }

    const data = { name: name, email: email, picUrl: picUrl };

    await StudentService.update(id, data)
        .then((student) => {
            response.json(student);
        }).catch(() => { 
            response.sendStatus(404);
        });
}


async function del(_request, response) {
    if (_request.role != 'ADMIN') {
        response.sendStatus(403);
        return;
    }
    
    const idSchema = z.string().min(12).regex(new RegExp('\\d{5}.{2,5}\\d{4}')).transform((val) => val.toUpperCase());

    const id = _request.query.id;
    
    if (!idSchema.safeParse(id).success) {
        response.status(400).json({ error:'Malformed ID!'});
        return;
    }

    await StudentService.del(id)
        .then(() => {
            response.status(204).send();
        }).catch(() => { 
            response.sendStatus(404);
        });
}

export default { list, add, read, update, del };
