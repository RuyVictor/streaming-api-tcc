import NodeMediaServer from "node-media-server";
import { AppDataSource } from "../../database";
import { Stream, StreamStatus } from "../../models/Stream";

export class StreamService {
  private nodeMediaServer: NodeMediaServer;

  constructor(nodeMediaServer) {
    this.nodeMediaServer = nodeMediaServer;
  }

  run() {
    this.nodeMediaServer.on("prePublish", async (id, StreamPath, args) => {
      const streamRepository = AppDataSource.getRepository(Stream);

      const transmissionKeyFromClient = StreamPath.split("/").pop();

      const foundStream = await streamRepository.findOneBy({
        transmission_key: transmissionKeyFromClient,
      });

      if (!foundStream) {
        return this.nodeMediaServer.getSession(id).reject();
      }

      await streamRepository.update(foundStream.id, {
        status: StreamStatus.ACTIVE,
      });
    });

    this.nodeMediaServer.on("donePublish", async (id, StreamPath, args) => {
      const streamRepository = AppDataSource.getRepository(Stream);

      const transmissionKeyFromClient = StreamPath.split("/").pop();

      const foundStream = await streamRepository.findOneBy({
        transmission_key: transmissionKeyFromClient,
      });

      await streamRepository.update(foundStream.id, {
        status: StreamStatus.INACTIVE,
        spectators: 0,
      });
    });

    this.nodeMediaServer.on("prePlay", async (id, StreamPath, args) => {
      const streamRepository = AppDataSource.getRepository(Stream);

      const transmissionKeyFromClient = StreamPath.split("/").pop();

      const foundStream = await streamRepository.findOneBy({
        transmission_key: transmissionKeyFromClient,
      });

      await streamRepository.update(foundStream.id, {
        spectators: foundStream.spectators + 1,
      });
    });

    this.nodeMediaServer.on("donePlay", async (id, StreamPath, args) => {
      const streamRepository = AppDataSource.getRepository(Stream);

      const transmissionKeyFromClient = StreamPath.split("/").pop();

      const foundStream = await streamRepository.findOneBy({
        transmission_key: transmissionKeyFromClient,
      });

      await streamRepository.update(foundStream.id, {
        spectators: foundStream.spectators - 1,
      });
    });
  }
}
