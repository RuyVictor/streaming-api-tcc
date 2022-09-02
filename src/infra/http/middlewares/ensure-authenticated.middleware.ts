import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { TokenIsMissingError } from '@/application/authentication/errors/token-is-missing.error';
import { InvalidTokenError } from '@/application/authentication/errors/invalid-token.error';
import { inject, injectable } from 'tsyringe';
import { AuthenticationRepositoryInterface } from '@/application/authentication/repositories/authentication.repository';
import AppError from '../errors/AppError';

@injectable()
export class EnsureAuthenticated {
  constructor(
    @inject('AuthRepository')
    private authRepository: AuthenticationRepositoryInterface
  ) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new TokenIsMissingError();
      }

      const [, accessToken] = authHeader.split(' ');

      const accessTokenIsBlackListed =
        await this.authRepository.findTokenByHash(accessToken);
      if (accessTokenIsBlackListed) {
        throw new InvalidTokenError();
      }

      const { sub } = verify(accessToken, process.env.JWT_SECRET) as JwtPayload;

      req.body.userId = sub;
      req.body.accessToken = accessToken;

      return next();
    } catch (e) {
      next(new AppError(e.message, e.statusCode));
    }
  }
}
