import AppError from '@/infra/http/errors/AppError';

export class StreamNotFoundError extends AppError {
  constructor() {
    super('Stream not found.', 404);
  }
}
