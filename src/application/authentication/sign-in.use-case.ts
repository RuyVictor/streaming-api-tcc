import { injectable, inject } from 'tsyringe';
import { SignInDTO, SignInOutputDTO } from './dtos/sign-in.dto';
import { UserRepositoryInterface } from '@/application/user/repositories/user.repository';
import { UserNotFoundError } from './errors/user-not-found.error';
import { InvalidCrendtialsError } from './errors/invalid-credentials.error';
import { compare } from 'bcryptjs';
import { generateTokens } from '@/application/authentication/utils/generate-tokens.util';
import { decode, JwtPayload } from 'jsonwebtoken';

@injectable()
export class SignInUseCase {
  constructor(
    @inject('UserRepository')
    private userRepo: UserRepositoryInterface
  ) {}

  async execute({ email, password }: SignInDTO): Promise<SignInOutputDTO> {
    const user = await this.userRepo.findOneByEmailWithPassword(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new InvalidCrendtialsError();
    }

    const { accessToken, refreshToken } = generateTokens(user.id);
    const refreshTokenExp = decode(refreshToken) as JwtPayload;

    delete user.password;

    return {
      user,
      accessToken,
      refreshToken,
      refreshTokenExp: refreshTokenExp.exp,
    };
  }
}
