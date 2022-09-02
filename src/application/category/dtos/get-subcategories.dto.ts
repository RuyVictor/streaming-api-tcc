import { IPagination } from '@/application/common/interfaces/Pagination';
import { Category } from '@/domain/category.entity';

export interface GetSubcategoriesDTO extends IPagination {
  name: string;
}

export interface GetSubcategoriesOutputDTO {
  data: Category[];
  total: number;
}
