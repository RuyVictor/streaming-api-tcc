export interface EditStreamRequestDTO {
  userId: string;
  title?: string;
  description?: string;
  categoryId?: string;
}

export interface EditStreamDatabaseDTO {
  streamId: string;
  title?: string;
  status?: string;
  url?: string;
  spectators?: number;
  description?: string;
  category?: any;
}
