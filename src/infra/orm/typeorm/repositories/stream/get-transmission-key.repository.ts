import { AppDataSource } from '@/infra/orm/typeorm';
import { StreamRepositoryInterface } from '@/application/stream/repositories/stream.repository';
import { StreamModel } from '../../models/Stream';
import {
  GetTransmissionKeyDTO,
  GetTransmissionKeyOutputDTO,
} from '@/application/stream/dtos/get-transmission-key.dto';

export class GetTransmissionKeyRepositoryTypeORM
  implements Pick<StreamRepositoryInterface, 'getTransmissionKey'>
{
  private streamRepository = AppDataSource.getRepository(StreamModel);

  async getTransmissionKey({
    userId,
  }: GetTransmissionKeyDTO): Promise<GetTransmissionKeyOutputDTO> {
    const foundStream = await this.streamRepository.findOne({
      where: { user: { id: userId } },
      select: ['id', 'transmission_key'],
    });

    const formatedKey =
      foundStream.id + '?secret=' + foundStream.transmission_key;

    return { transmission_key: formatedKey };
  }
}
