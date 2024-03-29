import { container } from 'tsyringe';
import {
  SearchStreamsDTO,
  SearchStreamsOutputDTO,
} from '@/application/stream/dtos/search-streams.dto';
import { GetStreamsUseCase } from '@/application/stream/search-streams.use-case';
import { SearchStreamsJoiSchema } from './validations/search-streams.validation';
import { Request, Response, NextFunction } from 'express';

export class SearchStreamsController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<SearchStreamsOutputDTO>> {
    try {
      await SearchStreamsJoiSchema.validate(req.query);
      const { query, status, category, page, take } =
        req.query as unknown as SearchStreamsDTO;

      const usecase = container.resolve(GetStreamsUseCase);

      const { data, total } = await usecase.execute({
        query,
        status,
        category,
        page,
        take,
      });
      return res.status(200).json({ data, total });
    } catch (err) {
      next(err);
    }
  }
}
