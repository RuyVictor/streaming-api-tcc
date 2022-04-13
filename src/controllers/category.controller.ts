import { NextFunction, Request, Response } from "express";
import { ICategorySearchDTO } from "../models/dto/category.dto";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const [ result, total ] = await CategoryService.getCategories(req.query as unknown as ICategorySearchDTO);
      return res.status(200).json({data: result, total: total});
    } catch (err) {
      next(err);
    }
  }
}
