import { injectable, inject } from 'tsyringe';
import {
  RefreshTokenDTO,
  RefreshTokenOutputDTO,
} from './dtos/refresh-token.dto';
import { AuthenticationRepositoryInterface } from './repositories/authentication.repository';
import { UserRepositoryInterface } from '@/application/user/repositories/user.repository';
import { verify } from 'jsonwebtoken';
import { InvalidRefreshTokenError } from './errors/invalid-refresh-token.error';
import { generateTokens } from '@/application/authentication/utils/generate-tokens.util';
import AppError from '@/infra/http/errors/AppError';
import { AccessTokenOrRefreshTokenIsMissingError } from './errors/access-token-or-refresh-token-is-missing.error';

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('AuthRepository')
    private authRepo: AuthenticationRepositoryInterface,
    @inject('UserRepository')
    private userRepo: UserRepositoryInterface
  ) {}

  async execute({
    accessToken,
    refreshToken,
  }: RefreshTokenDTO): Promise<RefreshTokenOutputDTO> {
    if (!(accessToken && refreshToken)) {
      throw new AccessTokenOrRefreshTokenIsMissingError();
    }

    try {
      const { sub } = verify(refreshToken, process.env.JWT_SECRET);
      const userExists = await this.userRepo.findOneById(sub.toString());

      if (!userExists) {
        throw new InvalidRefreshTokenError();
      }

      const refreshTokenIsBlackListed = await this.authRepo.findTokenByHash(
        refreshToken
      );
      if (refreshTokenIsBlackListed) {
        throw new InvalidRefreshTokenError();
      }

      await this.authRepo.revokeToken({ accessToken }); // revoke old access token

      const { accessToken: newAccessToken } = generateTokens(userExists.id);

      return { newAccessToken };
    } catch (e) {
      throw new AppError(e.message, e.statusCode);
    }
  }
}
