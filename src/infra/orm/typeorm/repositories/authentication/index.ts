import {
  RevokeTokenDTO,
  RevokeTokenOutputDTO,
} from '@/application/authentication/dtos/revoke-token.dto';
import { AuthenticationRepositoryInterface } from '@/application/authentication/repositories/authentication.repository';
import { Token } from '@/domain/token.entity';
import { FindTokenByHashRepositoryTypeORM } from './find-token-by-hash.repository';
import { RevokeTokenRepositoryTypeORM } from './revoke-token.repository';

export class AuthenticationRepositoryTypeORM
  implements AuthenticationRepositoryInterface
{
  revokeToken(input: RevokeTokenDTO): Promise<RevokeTokenOutputDTO> {
    return new RevokeTokenRepositoryTypeORM().revokeToken(input);
  }

  findTokenByHash(hash: string): Promise<Token> {
    return new FindTokenByHashRepositoryTypeORM().findTokenByHash(hash);
  }
}
