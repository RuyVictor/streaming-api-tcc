import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import AppError from './errors/AppError';
import { routes } from './routes';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      message: err.message,
    });
  }
);

export { app };
