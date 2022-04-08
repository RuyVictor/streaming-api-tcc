import { Router } from 'express';

import StreamRoutes from './stream.routes';

const routes = Router();

routes.use('/stream', StreamRoutes);

routes.get('/', (request, response) =>
	response.json({ name: 'Streaming API', version: '1.0.0' }),
);

export default routes;