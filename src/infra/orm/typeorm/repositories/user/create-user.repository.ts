import { AppDataSource } from '@/infra/orm/typeorm';
import { CreateUserDTO } from '@/application/user/dtos/create-user.dto';
import { UserRepositoryInterface } from '@/application/user/repositories/user.repository';
import { UserModel } from '../../models/User';
import { User } from '@/domain/user.entity';

export class CreateUserRepositoryTypeORM
  implements Pick<UserRepositoryInterface, 'create'>
{
  private userRepository = AppDataSource.getRepository(UserModel);

  async create(input: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(input);

    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }
}
