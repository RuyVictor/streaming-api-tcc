import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { AppDataSource } from "./database";
import { nodeMediaServer } from "./rmtp";
import routes from "./routes";
import { AppError } from "./errors/AppError";

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

app.listen(3333, () =>
  console.log("Server running on http://localhost:3333")
);

// Database
AppDataSource.initialize()
.then(() => {
console.log(`Database connected!`);
})
.catch((err) => {
console.log(err);
});

nodeMediaServer.run()