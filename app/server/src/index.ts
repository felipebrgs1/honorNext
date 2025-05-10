import { Hono } from 'hono';
import user from './routes/user';

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

export default app;
