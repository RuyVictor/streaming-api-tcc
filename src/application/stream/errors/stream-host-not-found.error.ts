import AppError from '@/infra/http/errors/AppError';

export class StreamHostNotFoundError extends AppError {
  constructor() {
    super('Stream host not found.', 404);
  }
}
