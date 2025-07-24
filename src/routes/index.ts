import { Hono } from 'hono';

import authRoutes from './auth/auth.routes';
import testRoutes from './test/test.routes';

export const routes = new Hono();

routes.route('/auth', authRoutes);
routes.route('/test', testRoutes);
