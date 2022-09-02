import AppError from '@/infra/http/errors/AppError';

export class InvalidTokenError extends AppError {
  constructor() {
    super('Invalid JWT token.', 401);
  }
}
