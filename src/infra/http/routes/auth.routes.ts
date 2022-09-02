import { Router } from 'express';
import {
  SignInController,
  SignUpController,
  RefreshTokenController,
  RevokeTokenController,
} from '@/infra/controllers/authentication';

const router = Router();

router.post('/signin', SignInController.handle);
router.post('/signup', SignUpController.handle);
router.post('/refresh-token', RefreshTokenController.handle);
router.post('/revoke-tokens', RevokeTokenController.handle);

export { router as authRoutes };
