import NodeMediaServer from "node-media-server";
import { StreamService } from "./services/stream.service";
import ffmpeg from '@ffmpeg-installer/ffmpeg';

const config = {
  rtmp: {
    port: 443,
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
  trans: {
    ffmpeg: ffmpeg.path,
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
};

export const nodeMediaServer = new NodeMediaServer(config as any);

const streamService = new StreamService(nodeMediaServer);
streamService.run();
