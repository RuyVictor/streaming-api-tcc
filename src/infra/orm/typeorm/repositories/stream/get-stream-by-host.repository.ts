import { AppDataSource } from '@/infra/orm/typeorm';
import { StreamRepositoryInterface } from '@/application/stream/repositories/stream.repository';
import { StreamModel } from '../../models/Stream';
import { Stream } from '@/domain/stream.entity';

export class GetStreamByHostRepositoryTypeORM
  implements Pick<StreamRepositoryInterface, 'findByHostname'>
{
  private streamRepository = AppDataSource.getRepository(StreamModel);

  async findByHostname(hostname: string): Promise<Stream> {
    const stream = await this.streamRepository.findOne({
      where: { user: { name: hostname } },
      relations: ['category', 'user'],
    });

    return stream;
  }
}
