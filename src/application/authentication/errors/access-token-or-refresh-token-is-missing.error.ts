import AppError from '@/infra/http/errors/AppError';

export class AccessTokenOrRefreshTokenIsMissingError extends AppError {
  constructor() {
    super('access token or refresh token is missing.', 401);
  }
}
