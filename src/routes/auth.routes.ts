import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();

router.post('/signin', AuthController.signIn)
router.post('/signup', AuthController.signUp)
router.post('/refresh-token', ensureAuthenticated, AuthController.refreshToken)
router.post('/revoke-tokens', AuthController.revokeTokens)

export default router;