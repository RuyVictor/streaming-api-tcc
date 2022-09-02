import { AppDataSource } from '@/infra/orm/typeorm';
import { CategoryRepositoryInterface } from '@/application/category/repositories/category.repository';
import { CategoryModel } from '../../models/Category';
import { Category } from '@/domain/category.entity';

export class GetRootCategoriesRepositoryTypeORM
  implements Pick<CategoryRepositoryInterface, 'findRoots'>
{
  private categoryRepository = AppDataSource.getTreeRepository(CategoryModel);

  async findRoots(): Promise<Category[]> {
    // Obtendo as categorias mães, e se caso em uma delas contenha sub categorias é marcada como "have_subcategories"
    const rootCategories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.children', 'children')
      .leftJoin(
        'category.streams',
        'root_streams',
        'root_streams.status = :status',
        {
          status: 'active',
        }
      )
      .leftJoin(
        'children.streams',
        'subcategories_streams',
        'subcategories_streams.status = :status',
        {
          status: 'active',
        }
      )
      .select([
        'DISTINCT (category.id) AS id',
        'category.name AS name',
        'category.image AS image',
      ])
      .addSelect(
        "IF(COUNT(children.id) > 0, 'true', 'false')",
        'have_subcategories'
      )
      .addSelect(
        'COUNT(root_streams.id) + COUNT(subcategories_streams.id)',
        'number_of_streams'
      )
      .andWhere('category.parentId IS NULL')
      .groupBy('category.id')
      .getRawMany();

    return rootCategories;
  }
}
