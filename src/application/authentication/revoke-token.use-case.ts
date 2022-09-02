import { injectable, inject } from 'tsyringe';
import { RevokeTokenDTO, RevokeTokenOutputDTO } from './dtos/revoke-token.dto';
import { AccessTokenOrRefreshTokenIsMissingError } from './errors/access-token-or-refresh-token-is-missing.error';
import { AuthenticationRepositoryInterface } from './repositories/authentication.repository';

@injectable()
export class RevokeTokenUseCase {
  constructor(
    @inject('AuthRepository')
    private authRepo: AuthenticationRepositoryInterface
  ) {}

  async execute({
    accessToken,
    refreshToken,
  }: RevokeTokenDTO): Promise<RevokeTokenOutputDTO> {
    if (!accessToken && !refreshToken) {
      throw new AccessTokenOrRefreshTokenIsMissingError();
    }
    return await this.authRepo.revokeToken({ accessToken, refreshToken });
  }
}
