import { User } from '@/domain/user.entity';

export interface SignInDTO {
  email: string;
  password: string;
}

export interface SignInOutputDTO {
  user: User;
  accessToken: string;
  refreshToken: string;
  refreshTokenExp: number;
}
