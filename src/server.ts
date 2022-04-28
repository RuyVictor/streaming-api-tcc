import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import AppError from "./errors/AppError";
import routes from "./routes";

import { AppDataSource } from "./database";
import { nodeMediaServer } from "./rmtp";
import { SocketInstance } from "./socket";

const port = process.env.PORT || 3333;
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  return response.status(500).json({
    message: err.message,
  });
});

const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
server.listen(port, () =>
  console.log("Server running on http://localhost:" + port.toString())
);

// Socket
const socketInstance = new SocketInstance(io);
socketInstance.initialize();
console.log(`Socket initialized!`);

// Database
AppDataSource.initialize()
.then(() => {
console.log(`Database connected!`);
})
.catch((err) => {
console.log(err);
});

// RTMP
nodeMediaServer.run()