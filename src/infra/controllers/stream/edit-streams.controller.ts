import { container } from 'tsyringe';
import { EditStreamRequestDTO } from '@/application/stream/dtos/edit-stream.dto';
import { Stream } from '@/domain/stream.entity';
import { EditStreamUseCase } from '@/application/stream/edit-stream.use-case';
import { Request, Response, NextFunction } from 'express';

export class EditStreamController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Stream>> {
    const { title, description, categoryId, userId } =
      req.body as EditStreamRequestDTO;

    const usecase = container.resolve(EditStreamUseCase);

    try {
      const stream = await usecase.execute({
        title,
        description,
        categoryId,
        userId,
      });
      return res.status(200).send(stream);
    } catch (err) {
      next(err);
    }
  }
}
