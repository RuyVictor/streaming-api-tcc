import { Router } from 'express';
import {
  SearchStreamsController,
  GetOneStreamController,
  EditStreamController,
  GetTransmissionKeyController,
} from '@/infra/controllers/stream';
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated.middleware';
import { container } from 'tsyringe';

const router = Router();

const ensureAuthenticated = container.resolve(EnsureAuthenticated);

router.get('/find', SearchStreamsController.handle);
router.get('/find-one', GetOneStreamController.handle);
router.put(
  '/edit',
  (req, res, next) => ensureAuthenticated.handle(req, res, next),
  EditStreamController.handle
);
router.get(
  '/transmission-key',
  (req, res, next) => ensureAuthenticated.handle(req, res, next),
  GetTransmissionKeyController.handle
);

export { router as streamRoutes };
