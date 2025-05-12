import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const user = new Hono();
user.get('/:id', async (c) => {
    const id = c.req.param('id');
    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
    });
    return c.json(user);
});
user.get('/', async (c) => {
    const users = await prisma.user.findMany();
    return c.json(users);
});

user.post('/create', async (c) => {
    const { name, email } = await c.req.json();
    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });
    return c.json(user);
});

export default user;
