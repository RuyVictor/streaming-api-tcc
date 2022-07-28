import { ChatRoutes } from './routes/chat.routes';
import { Server, Socket } from 'socket.io';

export class SocketInstance {
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  initialize() {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Socket: Client ${socket.id} connected!`);

      socket.on('disconnect', () => {
        console.log(`Socket: Client ${socket.id} disconnected!`);
      });

      ChatRoutes(this.io, socket);
    });
  }
}
