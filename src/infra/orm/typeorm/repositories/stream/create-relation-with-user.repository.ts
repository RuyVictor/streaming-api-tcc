import { AppDataSource } from '@/infra/orm/typeorm';
import { StreamRepositoryInterface } from '@/application/stream/repositories/stream.repository';
import { StreamModel } from '../../models/Stream';
import { CreateRelationStreamUserDTO } from '@/application/stream/dtos/create-relation-stream-user.dto';
import { generateTransmissionKey } from '@/application/stream/utils/generate-transmission-key.util';

export class CreateRelationWithUserRepositoryTypeORM
  implements Pick<StreamRepositoryInterface, 'createRelationWithUser'>
{
  private streamRepository = AppDataSource.getRepository(StreamModel);

  async createRelationWithUser({
    user,
  }: CreateRelationStreamUserDTO): Promise<void> {
    const stream = this.streamRepository.create({
      user,
      transmission_key: generateTransmissionKey(20),
    });

    await this.streamRepository.save(stream);
  }
}
