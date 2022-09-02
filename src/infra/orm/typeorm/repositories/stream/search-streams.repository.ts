import { AppDataSource } from '@/infra/orm/typeorm';
import { Brackets } from 'typeorm';
import { StreamRepositoryInterface } from '@/application/stream/repositories/stream.repository';
import { StreamModel } from '../../models/Stream';
import {
  SearchStreamsDTO,
  SearchStreamsOutputDTO,
} from '@/application/stream/dtos/search-streams.dto';

export class SearchStreamsRepositoryTypeORM
  implements Pick<StreamRepositoryInterface, 'searchStreams'>
{
  private streamRepository = AppDataSource.getRepository(StreamModel);

  async searchStreams({
    query,
    status,
    category,
    page,
    take,
  }: SearchStreamsDTO): Promise<SearchStreamsOutputDTO> {
    const [result, total] = await this.streamRepository
      .createQueryBuilder('streams')
      .leftJoinAndSelect('streams.category', 'category')
      .leftJoinAndSelect('streams.user', 'user')
      .where('streams.status = :status', { status })
      .andWhere(
        new Brackets((qb) => {
          query &&
            qb.where('streams.title LIKE :query', { query: `%${query}%` });
          query && qb.orWhere('user.name LIKE :query', { query: `%${query}%` });
          category && qb.andWhere('category.name = :name', { name: category });
        })
      )
      .orderBy('streams.spectators', 'DESC')
      .skip((page - 1) * take)
      .take(take)
      .getManyAndCount();

    return { data: result, total };
  }
}
