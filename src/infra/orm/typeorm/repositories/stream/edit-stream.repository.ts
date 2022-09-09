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
    url,
    status,
    spectators,
  }: EditStreamDatabaseDTO): Promise<Stream> {
    await this.streamRepository.update(streamId, {
      ...(title && { title }),
      ...(description && { description }),
      ...(category && { category }),
      ...(url && { url }),
      ...(status && { status }),
      ...(spectators && { spectators }),
    });

    return await this.streamRepository.findOneBy({ id: streamId });
  }
}
