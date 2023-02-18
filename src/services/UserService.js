import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


async function add(data) {
    const user = await prisma.user.create({
        data: data
    }).then((user) => {
        console.log('New User Added:');
        console.log(user);
    });

    return user;
}

async function read(email) {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
}

async function update(email, data) {
    return await prisma.user.update({
        where: {
            email: email
        },
        data: data
    });
}

async function del(email) {
    await prisma.user.delete({
        where: {
            email: email,
        },
    }).then( (user) => {
        console.log('Deleted User:');
        console.log(user);
    }).catch( () => {
        throw new Error('Unable to find register!');
    });
}

export default { add, read, update, del };
