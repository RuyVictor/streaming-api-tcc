import { container } from 'tsyringe';

// repositories
import { AuthenticationRepositoryInterface } from '@/application/authentication/repositories/authentication.repository';
import { CategoryRepositoryInterface } from '@/application/category/repositories/category.repository';
import { StreamRepositoryInterface } from '@/application/stream/repositories/stream.repository';
import { UserRepositoryInterface } from '@/application/user/repositories/user.repository';

// dependencies
import { AuthenticationRepositoryTypeORM } from '@/infra/orm/typeorm/repositories/authentication';
import { UserRepositoryTypeORM } from '@/infra/orm/typeorm/repositories/user';
import { CategoryRepositoryTypeORM } from '@/infra/orm/typeorm/repositories/category';
import { StreamRepositoryTypeORM } from '@/infra/orm/typeorm/repositories/stream';

// auth dependencies
container.register<AuthenticationRepositoryInterface>(
  'AuthRepository',
  AuthenticationRepositoryTypeORM
);

// user dependencies
container.register<UserRepositoryInterface>(
  'UserRepository',
  UserRepositoryTypeORM
);

// category dependencies
container.register<CategoryRepositoryInterface>(
  'CategoryRepository',
  CategoryRepositoryTypeORM
);

// stream dependencies
container.register<StreamRepositoryInterface>(
  'StreamRepository',
  StreamRepositoryTypeORM
);
