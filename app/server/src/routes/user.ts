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

export default user;
