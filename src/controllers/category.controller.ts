import { NextFunction, Request, Response } from 'express';
import { ICategorySearchDTO } from '../models/dto/category.dto';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const [result, total] = await CategoryService.getCategories(
        req.query as unknown as ICategorySearchDTO
      );
      return res.status(200).json({ data: result, total });
    } catch (err) {
      next(err);
    }
  }

  static async getOneCategory(req: Request, res: Response, next: NextFunction) {
    const { name } = req.query;

    try {
      const result = await CategoryService.getOneCategory(name as string);
      return res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  static async getSelectableCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const [result, total] = await CategoryService.getSelectableCategories();
      return res.status(200).json({ data: result, total });
    } catch (err) {
      next(err);
    }
  }
}
