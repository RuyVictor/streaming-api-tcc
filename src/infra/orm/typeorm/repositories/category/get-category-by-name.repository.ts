import { AppDataSource } from '@/infra/orm/typeorm';
import { CategoryRepositoryInterface } from '@/application/category/repositories/category.repository';
import { CategoryModel } from '../../models/Category';
import { Category } from '@/domain/category.entity';

export class GetCategoryByNameRepositoryTypeORM
  implements Pick<CategoryRepositoryInterface, 'findByName'>
{
  private categoryRepository = AppDataSource.getRepository(CategoryModel);

  async findByName(name: string): Promise<Category> {
    const categoryExists = await this.categoryRepository.findOneBy({ name });

    if (categoryExists) {
      const category = await this.categoryRepository
        .createQueryBuilder('category')
        .loadRelationCountAndMap(
          'category.number_of_streams',
          'category.streams',
          'stream',
          (qb) => qb.where('stream.status = :status', { status: 'active' })
        )
        .andWhere('category.name = :name', { name: categoryExists.name })
        .getOne();

      return category;
    }

    return null;
  }
}
