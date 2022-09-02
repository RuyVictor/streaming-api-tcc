import { Category } from '@/domain/category.entity';

export interface GetSelectableCategoriesOutputDTO {
  data: Category[];
  total: number;
}
