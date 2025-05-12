import { Hono } from 'hono';
import user from './routes/user';
import task from './routes/task';

import * as fs from 'fs';
import * as path from 'path';
const app = new Hono();

app.get('/', async (c) => {
    const htmlContent = await fs.promises.readFile(
        path.join(__dirname, 'view', 'default.html'),
        'utf-8',
    );
    return c.html(htmlContent);
});
app.route('/user', user);
app.route('/task', task);

export default app;
