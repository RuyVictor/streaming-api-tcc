import { Category } from '@/domain/category.entity';
import {
  GetCategoriesWithActiveStreamsDTO,
  GetCategoriesWithActiveStreamsOutputDTO,
} from '../dtos/get-categories-with-active-streams.dto';
import { GetSelectableCategoriesOutputDTO } from '../dtos/get-selectable-categories.dto';

export interface CategoryRepositoryInterface {
  findById(id: string): Promise<Category>;
  findByName(name: string): Promise<Category>;
  findWithActiveStreams(
    input: GetCategoriesWithActiveStreamsDTO
  ): Promise<GetCategoriesWithActiveStreamsOutputDTO>;
  findRoots(): Promise<Category[]>;
  findSelectable(): Promise<GetSelectableCategoriesOutputDTO>;
}
