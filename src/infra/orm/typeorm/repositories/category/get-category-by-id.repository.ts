import { AppDataSource } from '@/infra/orm/typeorm';
import { CategoryRepositoryInterface } from '@/application/category/repositories/category.repository';
import { CategoryModel } from '../../models/Category';
import { Category } from '@/domain/category.entity';

export class GetCategoryByIdRepositoryTypeORM
  implements Pick<CategoryRepositoryInterface, 'findById'>
{
  private categoryRepository = AppDataSource.getRepository(CategoryModel);

  async findById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      id,
    });

    return category;
  }
}
