import { CreateUserDTO } from '@/application/user/dtos/create-user.dto';
import { UserRepositoryInterface } from '@/application/user/repositories/user.repository';
import { User } from '@/domain/user.entity';
import { CreateUserRepositoryTypeORM } from './create-user.repository';
import { GetUserByEmailWithPasswordRepositoryTypeORM } from './get-user-by-email-with-password.repository';
import { GetUserByIdRepositoryTypeORM } from './get-user-by-id.repository';

export class UserRepositoryTypeORM implements UserRepositoryInterface {
  create(input: CreateUserDTO): Promise<User> {
    return new CreateUserRepositoryTypeORM().create(input);
  }

  findOneById(id: string): Promise<User> {
    return new GetUserByIdRepositoryTypeORM().findOneById(id);
  }

  findOneByEmailWithPassword(email: string): Promise<User> {
    return new GetUserByEmailWithPasswordRepositoryTypeORM().findOneByEmailWithPassword(
      email
    );
  }
}
