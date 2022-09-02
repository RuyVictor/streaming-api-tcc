import { injectable, inject } from 'tsyringe';
import { Category } from '@/domain/category.entity';
import { CategoryRepositoryInterface } from './repositories/category.repository';

@injectable()
export class GetOneCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepo: CategoryRepositoryInterface
  ) {}

  async execute(name: string): Promise<Category> {
    return await this.categoryRepo.findByName(name);
  }
}
