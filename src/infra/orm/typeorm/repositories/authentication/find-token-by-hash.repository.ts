import { AuthenticationRepositoryInterface } from '@/application/authentication/repositories/authentication.repository';
import { AppDataSource } from '../..';
import { TokenModel } from '../../models/Token';
import { Token } from '@/domain/token.entity';

export class FindTokenByHashRepositoryTypeORM
  implements Pick<AuthenticationRepositoryInterface, 'findTokenByHash'>
{
  private tokenRepository = AppDataSource.getRepository(TokenModel);

  async findTokenByHash(hash: string): Promise<Token> {
    const token = await this.tokenRepository.findOneBy({
      hash,
    });

    return token;
  }
}
