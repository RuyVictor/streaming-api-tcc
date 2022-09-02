import AppError from '@/infra/http/errors/AppError';

export class UserNotFoundError extends AppError {
  constructor() {
    super('User not found', 404);
  }
}
