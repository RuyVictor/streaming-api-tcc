import { Router } from 'express';
import { StreamController } from '../controllers/stream.controller';

const router = Router();

router.get('/find', StreamController.getStreams)
router.get('/find-one', StreamController.getOneStream)

export default router;