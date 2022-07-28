import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

router.post('/signin', AuthController.signIn);
router.post('/signup', AuthController.signUp);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/revoke-tokens', AuthController.revokeTokens);

export default router;
