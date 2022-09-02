import { container } from 'tsyringe';
import {
  GetSubcategoriesDTO,
  GetSubcategoriesOutputDTO,
} from '@/application/category/dtos/get-subcategories.dto';
import { GetSubcategoriesUseCase } from '@/application/category/get-subcategories.use-case';
import { Request, Response, NextFunction } from 'express';

export class GetSubcategoriesController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<GetSubcategoriesOutputDTO>> {
    const { name, page, take } = req.query as unknown as GetSubcategoriesDTO;

    const usecase = container.resolve(GetSubcategoriesUseCase);

    try {
      const { data, total } = await usecase.execute({
        name,
        page,
        take,
      });
      return res.status(200).json({ data, total });
    } catch (err) {
      next(err);
    }
  }
}
