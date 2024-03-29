import NodeMediaServer from 'node-media-server';
import { NodeMediaServerUseCase } from '@/application/stream/node-media-server.use-case';
import ffmpeg from '@ffmpeg-installer/ffmpeg';
import { container } from 'tsyringe';

const config = {
  rtmp: {
    port: Number(process.env.RTMP_PORT),
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot: '/tmp',
  },
  trans: {
    ffmpeg: ffmpeg.path,
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
      },
    ],
  },
};

export const nodeMediaServer = new NodeMediaServer(config as any);
container.resolve(NodeMediaServerUseCase).execute(nodeMediaServer);
