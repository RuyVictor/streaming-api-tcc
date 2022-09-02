import AppError from '@/infra/http/errors/AppError';

export class InvalidRefreshTokenError extends AppError {
  constructor() {
    super('Invalid refresh token.', 401);
  }
}
