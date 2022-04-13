import { Router } from 'express';

import StreamRoutes from './stream.routes';
import AuthRoutes from './auth.routes';
import CategoryRoutes from './category.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/stream', StreamRoutes);
routes.use('/category', CategoryRoutes);
routes.use('/auth', AuthRoutes);

routes.get('/teste', ensureAuthenticated, (request, response) =>
	response.json({ name: 'Streaming API', version: '1.0.0' }),
);

routes.get('/', (request, response) =>
	response.json({ name: 'Streaming API', version: '1.0.0' }),
);

export default routes;