import { AppDataSource } from '@/infra/orm/typeorm';
import { StreamRepositoryInterface } from '@/application/stream/repositories/stream.repository';
import { StreamModel } from '../../models/Stream';

export class GetStreamByHostIdRepositoryTypeORM
  implements Pick<StreamRepositoryInterface, 'findByHostId'>
{
  private streamRepository = AppDataSource.getRepository(StreamModel);

  async findByHostId(userId: string): Promise<StreamModel> {
    const stream = await this.streamRepository.findOne({
      where: { user: { id: userId } },
      relations: ['category'],
    });

    return stream;
  }
}
