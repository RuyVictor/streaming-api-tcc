import { container } from 'tsyringe';
import { GetOneCategoryDTO } from '@/application/category/dtos/get-category-by-name.dto';
import { Category } from '@/domain/category.entity';
import { GetOneCategoryUseCase } from '@/application/category/get-one-category.use-case';
import { GetOneCategoryJoiSchema } from './validations/get-one-categories.validation';
import { Request, Response, NextFunction } from 'express';

export class GetOneCategoryController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Category>> {
    try {
      await GetOneCategoryJoiSchema.validate(req.query);
      const { name } = req.query as unknown as GetOneCategoryDTO;

      const usecase = container.resolve(GetOneCategoryUseCase);

      const result = await usecase.execute(name);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
