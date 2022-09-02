import { AppDataSource } from '@/infra/orm/typeorm';
import { StreamRepositoryInterface } from '@/application/stream/repositories/stream.repository';
import { StreamModel } from '../../models/Stream';
import { Stream } from '@/domain/stream.entity';

export class GetStreamByIdAndReturnWithTransmissionKeyRepositoryTypeORM
  implements
    Pick<StreamRepositoryInterface, 'findByIdAndReturnWithTransmissionKey'>
{
  private streamRepository = AppDataSource.getRepository(StreamModel);

  async findByIdAndReturnWithTransmissionKey(id: string): Promise<Stream> {
    const stream = await this.streamRepository.findOne({
      where: { id },
      relations: ['category'],
      select: ['id', 'transmission_key', 'title'],
    });

    return stream;
  }
}
