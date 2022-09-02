import { AppDataSource } from '@/infra/orm/typeorm';
import { UserRepositoryInterface } from '@/application/user/repositories/user.repository';
import { UserModel } from '../../models/User';
import { User } from '@/domain/user.entity';

export class GetUserByEmailWithPasswordRepositoryTypeORM
  implements Pick<UserRepositoryInterface, 'findOneByEmailWithPassword'>
{
  private userRepository = AppDataSource.getRepository(UserModel);

  async findOneByEmailWithPassword(email: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    return user;
  }
}
