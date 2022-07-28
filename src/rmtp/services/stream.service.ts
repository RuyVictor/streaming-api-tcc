import NodeMediaServer from 'node-media-server';
import { AppDataSource } from '../../database';
import { Stream, StreamStatus } from '../../models/Stream';
import { iPrePublishAuthDTO } from './dto/stream.dto';

export class StreamService {
  private nodeMediaServer: NodeMediaServer;

  constructor(nodeMediaServer) {
    this.nodeMediaServer = nodeMediaServer;
  }

  run() {
    this.nodeMediaServer.on(
      'prePublish',
      async (id, StreamPath, { secret }: iPrePublishAuthDTO) => {
        const streamRepository = AppDataSource.getRepository(Stream);

        const streamId = StreamPath.split('/').pop();

        const foundStream = await streamRepository.findOne({
          where: { id: streamId },
          relations: ['category'],
          select: ['id', 'transmission_key', 'title'],
        });

        if (
          !foundStream ||
          !foundStream.category ||
          foundStream.transmission_key !== secret
        ) {
          const session = this.nodeMediaServer.getSession(id) as any;
          return session.reject();
        }

        await streamRepository.update(streamId, {
          status: StreamStatus.ACTIVE,
          spectators: 0,
          url: `http://${process.env.HOST_IP}:8000/live/${streamId}/index.m3u8`,
        });
      }
    );

    this.nodeMediaServer.on('donePublish', async (id, StreamPath) => {
      const streamRepository = AppDataSource.getRepository(Stream);

      const streamId = StreamPath.split('/').pop();

      const foundStream = await streamRepository.findOneBy({
        id: streamId,
      });

      await streamRepository.update(foundStream.id, {
        status: StreamStatus.INACTIVE,
        spectators: 0,
      });
    });

    /* this.nodeMediaServer.on("prePlay", async (id, StreamPath, args) => {});

    this.nodeMediaServer.on("donePlay", async (id, StreamPath, args) => {}); */
  }
}
