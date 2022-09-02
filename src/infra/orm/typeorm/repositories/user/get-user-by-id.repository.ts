import { AppDataSource } from '@/infra/orm/typeorm';
import { UserRepositoryInterface } from '@/application/user/repositories/user.repository';
import { UserModel } from '../../models/User';
import { User } from '@/domain/user.entity';

export class GetUserByIdRepositoryTypeORM
  implements Pick<UserRepositoryInterface, 'findOneById'>
{
  private userRepository = AppDataSource.getRepository(UserModel);

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id,
    });

    return user;
  }
}
