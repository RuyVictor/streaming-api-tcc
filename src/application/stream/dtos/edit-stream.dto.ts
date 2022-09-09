import { StreamStatus } from '@/domain/stream.entity';

export interface EditStreamRequestDTO {
  userId: string;
  title?: string;
  description?: string;
  categoryId?: string;
}

export interface EditStreamDatabaseDTO {
  streamId: string;
  title?: string;
  status?: StreamStatus;
  url?: string;
  spectators?: number;
  description?: string;
  category?: any;
}
