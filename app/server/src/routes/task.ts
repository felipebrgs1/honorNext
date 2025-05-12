import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const task = new Hono();

const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    completed: z.boolean().default(false),
    dueDate: z.string().datetime().optional(),
    userId: z.number().int().positive('userId must be a positive integer'),
});

task.get('/', async (c) => {
    const tasks = await prisma.task.findMany();
    return c.json(tasks);
});

task.get('/:userId', async (c) => {
    const userIdParam = c.req.param('userId');
    const userId = Number(userIdParam);
    if (!Number.isInteger(userId) || userId <= 0) {
        return c.json({ error: 'userId must be a positive integer' }, 400);
    }

    const tasks = await prisma.task.findMany({
        where: {
            userId: userId,
        },
    });
    return c.json(tasks);
});

task.post('/create', async (c) => {
    const body = await c.req.json();
    const parseResult = createTaskSchema.safeParse(body);

    if (!parseResult.success) {
        return c.json({ error: parseResult.error.flatten() }, 400);
    }

    const { title, description, completed, dueDate, userId } = {
        ...parseResult.data,
    };

    if (!userId || typeof userId !== 'number') {
        return c.json(
            { error: 'userId is required and must be a number' },
            400,
        );
    }

    const task = await prisma.task.create({
        data: {
            title,
            description,
            completed,
            dueDate,
            user: {
                connect: { id: userId },
            },
        },
    });

    return c.json(task);
});

export default task;
