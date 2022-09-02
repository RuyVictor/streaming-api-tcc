import { container } from 'tsyringe';
import { GetRootCategoriesUseCase } from '@/application/category/get-root-categories.use-case';
import { Request, Response, NextFunction } from 'express';
import { Category } from '@/domain/category.entity';

export class GetRootCategoriesController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Category[]>> {
    const usecase = container.resolve(GetRootCategoriesUseCase);

    try {
      const data = await usecase.execute();
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}
