import { AppDataSource } from '@/infra/orm/typeorm';
import { CategoryRepositoryInterface } from '@/application/category/repositories/category.repository';
import { CategoryModel } from '../../models/Category';
import {
  GetCategoriesWithActiveStreamsDTO,
  GetCategoriesWithActiveStreamsOutputDTO,
} from '@/application/category/dtos/get-categories-with-active-streams.dto';

export class GetCategoriesWithActiveStreamsRepositoryTypeORM
  implements Pick<CategoryRepositoryInterface, 'findWithActiveStreams'>
{
  private categoryRepository = AppDataSource.getTreeRepository(CategoryModel);

  async findWithActiveStreams({
    categoryId,
    page,
    take,
  }: GetCategoriesWithActiveStreamsDTO): Promise<GetCategoriesWithActiveStreamsOutputDTO> {
    // Mostra todas as  que possuem streams ativas e a quantidade total
    const result = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.streams', 'stream', 'stream.status = :status', {
        status: 'active',
      })
      // Sobrescreve o alias padrão do getRawMany()
      .select([
        'DISTINCT (category.id) AS id',
        'category.name AS name',
        'category.image AS image',
      ])
      .addSelect('COUNT(stream.id)', 'number_of_streams')
      /* .loadRelationCountAndMap(
          "category.number_of_streams",
          "category.streams",
          "stream",
          (qb) => qb.where("stream.status = :status", { status: "active" })
        ) */
      .andWhere('category.parentId = :id', { id: categoryId })
      .groupBy('category.id')
      .orderBy('COUNT(stream.id)', 'DESC')
      .offset((page - 1) * take)
      .limit(take)
      // getMany() apenas mostra propriedades existentes na tabela
      // getRawMany() permite mostrar o campo fictício spectators criado nesta query
      .getRawMany();

    const total = await this.categoryRepository
      .createQueryBuilder('category')
      .loadRelationCountAndMap(
        'category.number_of_streams',
        'category.streams',
        'stream',
        (qb) => qb.where('stream.status = :status', { status: 'active' })
      )
      .andWhere('category.parentId = :id', { id: categoryId })
      .getCount();

    return { data: result, total };
  }
}
