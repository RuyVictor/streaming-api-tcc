import AppError from '@/infra/http/errors/AppError';

export class TokenIsMissingError extends AppError {
  constructor() {
    super('JWT token is missing.', 401);
  }
}
