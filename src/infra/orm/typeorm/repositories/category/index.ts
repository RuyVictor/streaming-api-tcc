import {
  GetCategoriesWithActiveStreamsDTO,
  GetCategoriesWithActiveStreamsOutputDTO,
} from '@/application/category/dtos/get-categories-with-active-streams.dto';
import { GetSelectableCategoriesOutputDTO } from '@/application/category/dtos/get-selectable-categories.dto';
import { CategoryRepositoryInterface } from '@/application/category/repositories/category.repository';
import { Category } from '@/domain/category.entity';
import { GetCategoriesWithActiveStreamsRepositoryTypeORM } from './get-categories-with-active-streams.repository';
import { GetCategoryByIdRepositoryTypeORM } from './get-category-by-id.repository';
import { GetCategoryByNameRepositoryTypeORM } from './get-category-by-name.repository';
import { GetRootCategoriesRepositoryTypeORM } from './get-root-categories.repository';
import { GetSelectableCategoriesRepositoryTypeORM } from './get-selectable-categories.repository';

export class CategoryRepositoryTypeORM implements CategoryRepositoryInterface {
  findById(id: string): Promise<Category> {
    return new GetCategoryByIdRepositoryTypeORM().findById(id);
  }

  findByName(name: string): Promise<Category> {
    return new GetCategoryByNameRepositoryTypeORM().findByName(name);
  }

  findWithActiveStreams(
    input: GetCategoriesWithActiveStreamsDTO
  ): Promise<GetCategoriesWithActiveStreamsOutputDTO> {
    return new GetCategoriesWithActiveStreamsRepositoryTypeORM().findWithActiveStreams(
      input
    );
  }

  findRoots(): Promise<Category[]> {
    return new GetRootCategoriesRepositoryTypeORM().findRoots();
  }

  findSelectable(): Promise<GetSelectableCategoriesOutputDTO> {
    return new GetSelectableCategoriesRepositoryTypeORM().findSelectable();
  }
}
