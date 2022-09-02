import { AuthenticationRepositoryInterface } from '@/application/authentication/repositories/authentication.repository';
import {
  RevokeTokenDTO,
  RevokeTokenOutputDTO,
} from '@/application/authentication/dtos/revoke-token.dto';
import { AppDataSource } from '../..';
import { TokenModel } from '../../models/Token';

export class RevokeTokenRepositoryTypeORM
  implements Pick<AuthenticationRepositoryInterface, 'revokeToken'>
{
  private tokenRepository = AppDataSource.getRepository(TokenModel);

  async revokeToken({
    accessToken,
    refreshToken,
  }: RevokeTokenDTO): Promise<RevokeTokenOutputDTO> {
    await this.tokenRepository.save({ hash: accessToken });
    await this.tokenRepository.save({ hash: refreshToken });
    return { message: 'Token revoked!' };
  }
}
