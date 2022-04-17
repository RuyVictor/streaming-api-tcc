import { AppDataSource } from "../database";
import { AppError } from "../errors/AppError";
import { Category } from "../models/Category";
import { ICategorySearchDTO } from "../models/dto/category.dto";

export class CategoryService {
  static async getCategories({ name, page = 1, take = 20 }: ICategorySearchDTO) {
    const categoryRepository = AppDataSource.getTreeRepository(Category);

    if (name) {
      const category = await categoryRepository.findOneBy({ name });

      if (!category) {
        throw new AppError("Category not found.", 404);
      }

      // Show categories with total of streams
      const result = await categoryRepository
        .createDescendantsQueryBuilder(
          "category",
          "categoryClosure",
          new Category()
        )
        .leftJoin("category.streams", "stream", "stream.status = :status", {
          status: "active",
        })
        // Sobrescreve o alias padrão do getRawMany()
        .select([
          "DISTINCT (category.id) AS id",
          "category.name AS name",
          "category.image AS image",
        ])
        .addSelect("COUNT(stream.id)", "number_of_streams")
        /* .loadRelationCountAndMap(
          "category.number_of_streams",
          "category.streams",
          "stream",
          (qb) => qb.where("stream.status = :status", { status: "active" })
        ) */
        .andWhere("category.parentId = :id", { id: category.id })
        .groupBy("category.id")
        .orderBy("COUNT(stream.id)", "DESC")
        .offset((page - 1) * take)
        .limit(take)
        // getMany() apenas mostra propriedades existentes na tabela
        // getRawMany() permite mostrar o campo fictício spectators criado nesta query
        .getRawMany();

      const count = await categoryRepository
        .createDescendantsQueryBuilder(
          "category",
          "categoryClosure",
          new Category()
        )
        .loadRelationCountAndMap(
          "category.number_of_streams",
          "category.streams",
          "stream",
          (qb) => qb.where("stream.status = :status", { status: "active" })
        )
        .andWhere("category.parentId = :id", { id: category.id })
        .getCount();

      return [result, count];
    }

    const primaryCategories = await categoryRepository.findRoots();
    return [primaryCategories, primaryCategories.length];
  }

  static async getOneCategory(name: string) {
    const categoryRepository = AppDataSource.getRepository(Category);

    const category = await categoryRepository.findOneBy({ name });

    if (!category) {
      throw new AppError("Category not found.", 404);
    }

    return await categoryRepository
      .createQueryBuilder("category")
      .loadRelationCountAndMap(
        "category.spectators",
        "category.streams",
        "stream",
        (qb) => qb.where("stream.status = :status", { status: "active" })
      )
      .andWhere("category.name = :name", { name: category.name })
      .getOne();
  }
}
