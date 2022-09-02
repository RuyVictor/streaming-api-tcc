import { IPagination } from '@/application/common/interfaces/Pagination';
import { Stream } from '@/domain/stream.entity';

export interface SearchStreamsDTO extends IPagination {
  query?: string;
  status?: string;
  category?: string;
}

export interface SearchStreamsOutputDTO {
  data: Stream[];
  total: number;
}
