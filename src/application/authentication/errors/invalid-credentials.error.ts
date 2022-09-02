import AppError from '@/infra/http/errors/AppError';

export class InvalidCrendtialsError extends AppError {
  constructor() {
    super('Incorrect email/password combination.', 403);
  }
}
