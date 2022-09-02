import { injectable, inject } from 'tsyringe';
import { Stream } from '@/domain/stream.entity';
import { GetOneStreamDTO } from './dtos/get-one-stream.dto';
import { StreamRepositoryInterface } from './repositories/stream.repository';
import { StreamHostNotFoundError } from './errors/stream-host-not-found.error';

@injectable()
export class GetOneStreamUseCase {
  constructor(
    @inject('StreamRepository')
    private streamRepo: StreamRepositoryInterface
  ) {}

  async execute({ hostname }: GetOneStreamDTO): Promise<Stream> {
    if (!hostname) {
      throw new StreamHostNotFoundError();
    }

    const foundStream = await this.streamRepo.findByHostname(hostname);

    if (!foundStream) {
      throw new StreamHostNotFoundError();
    }
    return foundStream;
  }
}
