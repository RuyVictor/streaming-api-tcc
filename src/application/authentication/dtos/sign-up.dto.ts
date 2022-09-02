import { User } from '@/domain/user.entity';

export interface SignUpDTO {
  name: string;
  email: string;
  password: string;
}

export interface SignUpOutputDTO {
  user: User;
  accessToken: string;
  refreshToken: string;
  refreshTokenExp: number;
}
