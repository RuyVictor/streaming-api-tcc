import 'dotenv/config';
import 'reflect-metadata';
import '../container';
import { app } from './app';

import { AppDataSource } from '../orm/typeorm';
import { nodeMediaServer } from '../rtmp';
import { SocketService } from './socket';

const port = process.env.PORT || 3333;

const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
server.listen(port, () =>
  console.log('Server running on http://localhost:' + port.toString())
);

// Socket
const socketInstance = new SocketService(io);
socketInstance.initialize();
console.log('Socket initialized!');

// Database
AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.runMigrations();
    console.log('Database connected!');
  })
  .catch((err) => {
    console.log(err);
  });

// RTMP
nodeMediaServer.run();
