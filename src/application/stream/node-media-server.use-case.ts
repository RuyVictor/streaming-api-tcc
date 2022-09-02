import NodeMediaServer from 'node-media-server';
import { PrePublishAuthDTO } from './dtos/node-media-server.dto';
import { inject, injectable } from 'tsyringe';
import { StreamRepositoryInterface } from './repositories/stream.repository';
import { StreamStatus } from '@/domain/stream.entity';

@injectable()
export class NodeMediaServerUseCase {
  constructor(
    @inject('StreamRepository')
    private streamRepository: StreamRepositoryInterface
  ) {}

  execute(nodeMediaServer: NodeMediaServer) {
    nodeMediaServer.on(
      'prePublish',
      async (id, StreamPath, { secret }: PrePublishAuthDTO) => {
        const streamId = StreamPath.split('/').pop();

        const foundStream =
          await this.streamRepository.findByIdAndReturnWithTransmissionKey(
            streamId
          );

        if (
          !foundStream ||
          !foundStream.category ||
          foundStream.transmission_key !== secret
        ) {
          const session = nodeMediaServer.getSession(id) as any;
          return session.reject();
        }

        await this.streamRepository.edit({
          streamId,
          status: StreamStatus.ACTIVE,
          spectators: 0,
          url: `http://${process.env.HOST_IP}:8000/live/${streamId}/index.m3u8`,
        });
      }
    );

    nodeMediaServer.on('donePublish', async (id, StreamPath) => {
      const streamId = StreamPath.split('/').pop();

      const foundStream = await this.streamRepository.findById(streamId);

      await this.streamRepository.edit({
        streamId: foundStream.id,
        status: StreamStatus.INACTIVE,
        spectators: 0,
      });
    });

    /* this.nodeMediaServer.on("prePlay", async (id, StreamPath, args) => {});

    this.nodeMediaServer.on("donePlay", async (id, StreamPath, args) => {}); */
  }
}
