import { Router } from 'express';
import { StreamController } from '../controllers/stream.controller';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();

router.get('/find', StreamController.getStreams)
router.get('/find-one', StreamController.getOneStream)
router.put('/edit', ensureAuthenticated, StreamController.editStream)

export default router;