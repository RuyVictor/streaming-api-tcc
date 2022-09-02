import { RevokeTokenDTO, RevokeTokenOutputDTO } from '../dtos/revoke-token.dto';
import { Token } from '@/domain/token.entity';

export interface AuthenticationRepositoryInterface {
  revokeToken(input: RevokeTokenDTO): Promise<RevokeTokenOutputDTO>;
  findTokenByHash(hash: string): Promise<Token>;
}
