import { AppDataSource } from '@/infra/orm/typeorm';
import { StreamRepositoryInterface } from '@/application/stream/repositories/stream.repository';
import { StreamModel } from '../../models/Stream';
import { Stream } from '@/domain/stream.entity';

export class GetStreamByIdRepositoryTypeORM
  implements Pick<StreamRepositoryInterface, 'findById'>
{
  private streamRepository = AppDataSource.getRepository(StreamModel);

  async findById(id: string): Promise<Stream> {
    const stream = await this.streamRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    return stream;
  }
}
