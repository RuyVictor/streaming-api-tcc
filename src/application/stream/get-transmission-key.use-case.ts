import { injectable, inject } from 'tsyringe';
import {
  GetTransmissionKeyDTO,
  GetTransmissionKeyOutputDTO,
} from './dtos/get-transmission-key.dto';
import { StreamRepositoryInterface } from './repositories/stream.repository';

@injectable()
export class GetTransmissionKeyUseCase {
  constructor(
    @inject('StreamRepository')
    private streamRepo: StreamRepositoryInterface
  ) {}

  async execute(
    input: GetTransmissionKeyDTO
  ): Promise<GetTransmissionKeyOutputDTO> {
    return await this.streamRepo.getTransmissionKey(input);
  }
}
