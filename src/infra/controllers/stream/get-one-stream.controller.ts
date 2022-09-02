import { container } from 'tsyringe';
import { GetOneStreamDTO } from '@/application/stream/dtos/get-one-stream.dto';
import { GetOneStreamUseCase } from '@/application/stream/get-one-stream.use-case';
import { Stream } from '@/domain/stream.entity';
import { Request, Response, NextFunction } from 'express';

export class GetOneStreamController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Stream>> {
    const { hostname } = req.query as unknown as GetOneStreamDTO;

    const usecase = container.resolve(GetOneStreamUseCase);

    try {
      const stream = await usecase.execute({ hostname });
      return res.status(200).send(stream);
    } catch (err) {
      next(err);
    }
  }
}
