import { Router } from 'express';

import StreamRoutes from './stream.routes';
import AuthRoutes from './auth.routes';

const routes = Router();

routes.use('/stream', StreamRoutes);
routes.use('/auth', AuthRoutes);

routes.get('/', (request, response) =>
	response.json({ name: 'Streaming API', version: '1.0.0' }),
);

export default routes;