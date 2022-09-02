import { Category } from '@/domain/category.entity';
import { injectable, inject } from 'tsyringe';
import { CategoryRepositoryInterface } from './repositories/category.repository';

@injectable()
export class GetRootCategoriesUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepo: CategoryRepositoryInterface
  ) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepo.findRoots();
  }
}
