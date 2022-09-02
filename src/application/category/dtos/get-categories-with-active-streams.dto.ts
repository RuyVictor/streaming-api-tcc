import { IPagination } from '@/application/common/interfaces/Pagination';
import { Category } from '@/domain/category.entity';

export interface GetCategoriesWithActiveStreamsDTO extends IPagination {
  categoryId: string;
}

export interface GetCategoriesWithActiveStreamsOutputDTO {
  data: Category[];
  total: number;
}
