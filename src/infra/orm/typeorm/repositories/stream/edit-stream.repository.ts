import { AppDataSource } from '@/infra/orm/typeorm';
import { StreamRepositoryInterface } from '@/application/stream/repositories/stream.repository';
import { StreamModel } from '../../models/Stream';
import { EditStreamDatabaseDTO } from '@/application/stream/dtos/edit-stream.dto';
import { Stream } from '@/domain/stream.entity';

export class EditStreamRepositoryTypeORM
  implements Pick<StreamRepositoryInterface, 'edit'>
{
  private streamRepository = AppDataSource.getRepository(StreamModel);

  async edit({
    streamId,
    title,
    description,
    category,
  }: EditStreamDatabaseDTO): Promise<Stream> {
    await this.streamRepository.update(streamId, {
      title,
      description,
      category,
    });

    return await this.streamRepository.findOneBy({ id: streamId });
  }
}
