import { Router } from 'express';
import { StreamController } from '../controllers/stream.controller';

const router = Router();

router.get('/find', StreamController.getStreams)

export default router;