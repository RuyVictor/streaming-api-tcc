import { AppDataSource } from '@/infra/orm/typeorm';
import { Not } from 'typeorm';
import { CategoryRepositoryInterface } from '@/application/category/repositories/category.repository';
import { CategoryModel } from '../../models/Category';
import { GetSelectableCategoriesOutputDTO } from '@/application/category/dtos/get-selectable-categories.dto';

export class GetSelectableCategoriesRepositoryTypeORM
  implements Pick<CategoryRepositoryInterface, 'findSelectable'>
{
  private categoryRepository = AppDataSource.getRepository(CategoryModel);

  async findSelectable(): Promise<GetSelectableCategoriesOutputDTO> {
    const [result, total] = await this.categoryRepository.findAndCount({
      where: { name: Not('Jogos') },
    });

    return { data: result, total };
  }
}
