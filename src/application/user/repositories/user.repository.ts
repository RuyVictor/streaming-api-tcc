import { User } from '@/domain/user.entity';
import { CreateUserDTO } from '../dtos/create-user.dto';

export interface UserRepositoryInterface {
  create(input: CreateUserDTO): Promise<User>;
  findOneById(id: string): Promise<User>;
  findOneByEmailWithPassword(email: string): Promise<User>;
}
