import NodeMediaServer from "node-media-server";
import { AppDataSource } from "../../database";
import { Stream, StreamStatus } from "../../models/Stream";

export class StreamService {
  private nodeMediaServer: NodeMediaServer;

  constructor(nodeMediaServer) {
    this.nodeMediaServer = nodeMediaServer;
  }

  run() {
    this.nodeMediaServer.on(
      "prePublish",
      async (id, StreamPath, { secret }: iPrePublishAuthDTO) => {
        const streamRepository = AppDataSource.getRepository(Stream);

        const streamId = StreamPath.split("/").pop();

        const foundStream = await streamRepository.findOne({
          where: {id: streamId},
          select: ["transmission_key"]
        });

        if (!foundStream) {
          return this.nodeMediaServer.getSession(id).reject();
        }

        if (foundStream.transmission_key !== secret) {
          return this.nodeMediaServer.getSession(id).reject();
        }

        if (!foundStream.category) {
          return this.nodeMediaServer.getSession(id).reject();
        }

        await streamRepository.update(streamId, {
          status: StreamStatus.ACTIVE,
          spectators: 0,
          url: `http://localhost:8000/live/${streamId}.flv`,
        });
      }
    );

    this.nodeMediaServer.on("donePublish", async (id, StreamPath, args) => {
      const streamRepository = AppDataSource.getRepository(Stream);

      const streamId = StreamPath.split("/").pop();

      const foundStream = await streamRepository.findOneBy({
        id: streamId,
      });

      await streamRepository.update(foundStream.id, {
        status: StreamStatus.INACTIVE,
        spectators: 0,
      });
    });

    this.nodeMediaServer.on("prePlay", async (id, StreamPath, args) => {
      const streamRepository = AppDataSource.getRepository(Stream);

      const streamId = StreamPath.split("/").pop();

      const foundStream = await streamRepository.findOneBy({
        id: streamId,
      });

      await streamRepository.update(foundStream.id, {
        spectators: foundStream.spectators + 1,
      });
    });

    this.nodeMediaServer.on("donePlay", async (id, StreamPath, args) => {
      const streamRepository = AppDataSource.getRepository(Stream);

      const streamId = StreamPath.split("/").pop();

      const foundStream = await streamRepository.findOneBy({
        id: streamId,
      });

      await streamRepository.update(foundStream.id, {
        spectators: foundStream.spectators - 1,
      });
    });
  }
}
