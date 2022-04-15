import { AppDataSource } from "../database";
import { AppError } from "../errors/AppError";
import { Category } from "../models/Category";
import { ICategorySearchDTO } from "../models/dto/category.dto";

export class CategoryService {
  static async getCategories({ name, page, take }: ICategorySearchDTO) {
    const categoryRepository = AppDataSource.getTreeRepository(Category);

    if (name) {
      const category = await categoryRepository.findOneBy({ name });

      if (!category) {
        throw new AppError("Category not found.", 404);
      }

      // Show categories with total of spectators
      return await categoryRepository
        .createDescendantsQueryBuilder(
          "category",
          "categoryClosure",
          new Category()
        )
        .loadRelationCountAndMap(
          "category.spectators",
          "category.streams",
          "stream",
          (qb) => qb.where("stream.status = :status", { status: "active" })
        )
        .andWhere("category.parentId = :id", { id: category.id })
        .skip((page - 1) * take)
        .take(take)
        .getManyAndCount();
    }

    const primaryCategories = await categoryRepository.findRoots();
    return [primaryCategories, primaryCategories.length];
  }
}
