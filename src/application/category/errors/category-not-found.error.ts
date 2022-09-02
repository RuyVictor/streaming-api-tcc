import AppError from '@/infra/http/errors/AppError';

export class CategoryNotFoundError extends AppError {
  constructor() {
    super('Category not found.', 404);
  }
}
