import { Category } from './category.entity';

class Stream {
  id?: string;
  url: string;
  title: string;
  description: string;
  status: StreamStatus;
  spectators: number;
  transmission_key?: string;
  category?: Category;
  created_at?: Date;
  updated_at?: Date;

  private constructor({ url, title, description, status, spectators }: Stream) {
    return Object.assign(this, {
      url,
      title,
      description,
      status,
      spectators,
    });
  }

  static create({ url, title, description, status, spectators }: Stream) {
    const stream = new Stream({
      url,
      title,
      description,
      status,
      spectators,
    });
    return stream;
  }
}

export enum StreamStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export { Stream };
