import { Server, Socket } from 'socket.io';
import { AppDataSource } from '../../database';
import { Stream } from '../../models/Stream';

export interface IChat {
  roomId?: string;
  userName?: string;
  message?: string;
  isHost?: boolean;
}

export function ChatRoutes(io: Server, socket: Socket) {
  socket.on('join-chat-room', async (roomId) => {
    socket.join(roomId);

    const streamRepository = AppDataSource.getRepository(Stream);

    const foundStream = await streamRepository.findOneBy({
      id: roomId,
    });

    await streamRepository.update(foundStream.id, {
      spectators: foundStream.spectators + 1,
    });
  });

  socket.on('send-chat-message', (data: IChat) => {
    io.to(data.roomId).emit('chat-message', data);
  });

  socket.on('leave-chat-room', async (roomId) => {
    socket.leave(roomId);

    const streamRepository = AppDataSource.getRepository(Stream);

    const foundStream = await streamRepository.findOneBy({
      id: roomId,
    });

    if (foundStream.spectators > 0) {
      await streamRepository.update(foundStream.id, {
        spectators: foundStream.spectators - 1,
      });
    }
  });

  socket.on('disconnecting', async () => {
    const streamRepository = AppDataSource.getRepository(Stream);

    const roomId = Array.from(io.sockets.adapter.socketRooms(socket.id))[1];

    const foundStream = await streamRepository.findOneBy({
      id: roomId,
    });

    if (foundStream.spectators > 0) {
      await streamRepository.update(foundStream.id, {
        spectators: foundStream.spectators - 1,
      });
    }
  });
}
