import { ChatRoutes } from './routes/chat.routes';
import { Server, Socket } from 'socket.io';
import { container } from 'tsyringe';

export class SocketService {
  constructor(private readonly io: Server) {}

  initialize() {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Socket: Client ${socket.id} connected!`);

      socket.on('disconnect', () => {
        console.log(`Socket: Client ${socket.id} disconnected!`);
      });

      container.resolve(ChatRoutes).execute(this.io, socket);
    });
  }
}
