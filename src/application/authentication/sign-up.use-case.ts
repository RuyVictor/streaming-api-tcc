import { injectable, inject } from 'tsyringe';
import { SignUpDTO, SignUpOutputDTO } from './dtos/sign-up.dto';
import { StreamRepositoryInterface } from '@/application/stream/repositories/stream.repository';
import { UserRepositoryInterface } from '../user/repositories/user.repository';
import { DuplicatedEmailError } from './errors/duplicated-email.error';
import { hash } from 'bcryptjs';
import { generateTokens } from '@/application/authentication/utils/generate-tokens.util';
import { decode, JwtPayload } from 'jsonwebtoken';
import { User } from '@/domain/user.entity';

@injectable()
export class SignUpUseCase {
  constructor(
    @inject('UserRepository')
    private userRepo: UserRepositoryInterface,
    @inject('StreamRepository')
    private streamRepo: StreamRepositoryInterface
  ) {}

  async execute({
    email,
    name,
    password,
  }: SignUpDTO): Promise<SignUpOutputDTO> {
    const checkUserEmailExists = await this.userRepo.findOneByEmailWithPassword(
      email
    );

    if (checkUserEmailExists) {
      throw new DuplicatedEmailError();
    }

    const hashedPassword = await hash(password, 8);

    const user = User.create({ name, email, password: hashedPassword });

    const savedUser = await this.userRepo.create(user);

    const { accessToken, refreshToken } = generateTokens(savedUser.id);
    const refreshTokenExp = decode(refreshToken) as JwtPayload;

    await this.streamRepo.createRelationWithUser({ user: savedUser });

    delete savedUser.password;

    return {
      user: savedUser,
      accessToken,
      refreshToken,
      refreshTokenExp: refreshTokenExp.exp,
    };
  }
}
