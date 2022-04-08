import { StreamsRoutes } from "./routes/streams.routes";
import { Server, Socket } from "socket.io";

export class SocketInstance {
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  initialize() {
    this.io.on("connection", (socket: Socket) => {
      console.log(`Socket: Client ${socket.id} connected!`);

      socket.on("disconnect", () => {
        console.log(`Socket: Client ${socket.id} disconnected!`);
      });

      StreamsRoutes(this.io, socket);

      socket.on("stream", function (data) {
        socket.broadcast.emit("stream", data);
      });
    });
  }
}
