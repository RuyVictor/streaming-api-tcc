import NodeMediaServer from "node-media-server";
import { StreamService } from "./services/stream.service";

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: "*",
    mediaroot: "./media",
  },
};

export const nodeMediaServer = new NodeMediaServer(config);

const streamService = new StreamService(nodeMediaServer);
streamService.run();
