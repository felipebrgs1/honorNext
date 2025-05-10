import { Hono } from 'hono';

import fs from 'fs';
import path from 'path';
const app = new Hono();

app.get('/', async (c) => {
    const htmlContent = await fs.promises.readFile(
        path.join(__dirname, 'default.html'),
        'utf-8',
    );
    return c.html(htmlContent);
});

export default app;
