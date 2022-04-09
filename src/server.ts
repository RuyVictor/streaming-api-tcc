import 'dotenv/config'
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./database";
import { SocketInstance } from "./socket";
import routes from "./routes";

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
server.listen(3333, () =>
  console.log("Server running on http://localhost:3333")
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(routes);


// Database
AppDataSource.initialize().then(() => {
  console.log(`Database connected!`);
}).catch((err) => {
  console.log(err);
});

// Socket
const socketInstance = new SocketInstance(io);
socketInstance.initialize();
