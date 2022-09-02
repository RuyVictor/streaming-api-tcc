import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { streamRoutes } from './stream.routes';
import { categoryRoutes } from './category.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/stream', streamRoutes);
routes.use('/category', categoryRoutes);

routes.get('/', (request, response) =>
  response.json({ name: 'Streaming API', version: '1.0.0' })
);

export { routes };
