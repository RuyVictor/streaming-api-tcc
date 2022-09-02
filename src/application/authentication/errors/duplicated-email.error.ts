import AppError from '@/infra/http/errors/AppError';

export class DuplicatedEmailError extends AppError {
  constructor() {
    super('Email address already used.', 409);
  }
}
