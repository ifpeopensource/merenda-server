import StudentService from '../services/StudentService.js';

import { z } from "zod";


async function list(_request, response) {

    if (_request.role == 'USER') {
        response.sendStatus(403);
    }

    await StudentService.findAll()
        .then((students) => {
            response.json(students)
        }).catch((err) => {
            response.status(500).json({ error: err})
        });;

}

async function add(_request, response) {

    if (_request.role != 'ADMIN') {
        response.sendStatus(403);
    }

    const {id, name, email, picUrl} = _request.body
    await StudentService.addStudent(id, name, email, picUrl)
        .then((student) => {
            response.json(student)
        }).catch((err) => { 
            response.status(500).json({ error: err });
        });

}

async function read(_request, response) {

    if (_request.role == 'USER') {
        response.sendStatus(403);
    }

    const emailSchema = z.string().email()
    const idSchema = z.string().min(12).regex(new RegExp("/\d{5}.{2,5}\d{4}/g")).transform((val) => val.toUpperCase())

    const query = _request.q
    
    if (idSchema.safeParse(query).success) {
        type = 0;
    } else if(emailSchema.safeParse(query).success) {
        type = 1;
    } else {
        response.status(400).json({ error: "Malformed Query!"});
    }

    await StudentService.readStudent(query, type)
        .then((student) => {
            response.json(student)
        }).catch((err) => { 
            response.sendStatus(404);
        });

}

async function update(_request, response) {

    if (_request.role != 'ADMIN') {
        response.sendStatus(403);
    }

    const idSchema = z.string().min(12).regex(new RegExp("/\d{5}.{2,5}\d{4}/g")).transform((val) => val.toUpperCase())
    const emailSchema = z.string().email()
    const picSchema = z.string().url()
    const nameSchema = z.string()
    
    const { id, email, picUrl, name } = _request.body

    if (!idSchema.safeParse(id).success) {
        response.status(400).json({ error:"Malformed ID!" })
    }
    if (!emailSchema.safeParse(email)) {
        response.status(400).json({ error:"Malformed Email!" })
    }
    if (!picSchema.safeParse(picUrl)) {
        response.status(400).json({ error:"Malformed PicUrl!" })
    }
    if (!nameSchema.safeParse(name)) {
        response.status(400).json({ error:"Malformed Name!" })
    }

    await StudentService.updateStudent(id, name, email, picUrl)
        .then((student) => {
            response.json(student);
        }).catch((err) => { 
            response.sendStatus(404);
        });
}


async function del(_request, response) {

    if (_request.role != 'ADMIN') {
        response.sendStatus(403);
    }
    
    const idSchema = z.string().min(12).regex(new RegExp("/\d{5}.{2,5}\d{4}/g")).transform((val) => val.toUpperCase())

    const id = _request.q.id
    
    if (!idSchema.safeParse(id).success) {
        response.sendStatus(400);
    }

    await StudentService.deleteStudent(id)
        .then(() => {
            response.sendStatus(200);
        }).catch((err) => { 
            response.sendStatus(404);
        });

}

export default { list, add, read, update, del };
