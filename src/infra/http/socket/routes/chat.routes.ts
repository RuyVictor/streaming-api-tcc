import { StreamRepositoryInterface } from '@/application/stream/repositories/stream.repository';
import { Server, Socket } from 'socket.io';
import { inject, injectable } from 'tsyringe';

export interface IChat {
  roomId?: string;
  userName?: string;
  message?: string;
  isHost?: boolean;
}

@injectable()
export class ChatRoutes {
  constructor(
    @inject('StreamRepository')
    private streamRepository: StreamRepositoryInterface
  ) {}

  execute(io: Server, socket: Socket) {
    socket.on('join-chat-room', async (roomId) => {
      socket.join(roomId);

      const foundStream = await this.streamRepository.findById(roomId);

      await this.streamRepository.edit({
        streamId: foundStream.id,
        spectators: foundStream.spectators + 1,
      });
    });

    socket.on('send-chat-message', (data: IChat) => {
      io.to(data.roomId).emit('chat-message', data);
    });

    socket.on('leave-chat-room', async (roomId) => {
      socket.leave(roomId);

      const foundStream = await this.streamRepository.findById(roomId);

      if (foundStream.spectators > 0) {
        await this.streamRepository.edit({
          streamId: foundStream.id,
          spectators: foundStream.spectators - 1,
        });
      }
    });

    socket.on('disconnecting', async () => {
      const roomId = Array.from(io.sockets.adapter.socketRooms(socket.id))[1];

      const foundStream = await this.streamRepository.findById(roomId);

      if (foundStream.spectators > 0) {
        await this.streamRepository.edit({
          streamId: foundStream.id,
          spectators: foundStream.spectators - 1,
        });
      }
    });
  }
}
