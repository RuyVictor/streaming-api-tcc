import { container } from 'tsyringe';
import { GetSelectableCategoriesUseCase } from '@/application/category/get-selectable-categories.use-case';
import { Request, Response, NextFunction } from 'express';
import { GetSelectableCategoriesOutputDTO } from '@/application/category/dtos/get-selectable-categories.dto';

export class GetSelectableCategoriesController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<GetSelectableCategoriesOutputDTO>> {
    try {
      const usecase = container.resolve(GetSelectableCategoriesUseCase);

      const { data, total } = await usecase.execute();
      return res.status(200).json({ data, total });
    } catch (err) {
      next(err);
    }
  }
}
