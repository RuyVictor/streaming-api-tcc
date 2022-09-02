import { injectable, inject } from 'tsyringe';
import {
  SearchStreamsDTO,
  SearchStreamsOutputDTO,
} from './dtos/search-streams.dto';
import { StreamRepositoryInterface } from './repositories/stream.repository';

@injectable()
export class GetStreamsUseCase {
  constructor(
    @inject('StreamRepository')
    private streamRepo: StreamRepositoryInterface
  ) {}

  async execute({
    query,
    status = 'active',
    category,
    page = 1,
    take = 20,
  }: SearchStreamsDTO): Promise<SearchStreamsOutputDTO> {
    const { data, total } = await this.streamRepo.searchStreams({
      query,
      status,
      category,
      page,
      take,
    });

    return { data, total };
  }
}
