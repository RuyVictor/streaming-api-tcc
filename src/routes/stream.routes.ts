import { Router } from 'express';
import { StreamController } from '../controllers/stream.controller';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();

router.get('/find', StreamController.getStreams)
router.get('/find-one', StreamController.getOneStream)
router.put('/edit', ensureAuthenticated, StreamController.editStream)
router.get('/transmission-key', ensureAuthenticated, StreamController.getTransmissionKey)

export default router;