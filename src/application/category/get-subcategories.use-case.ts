import { injectable, inject } from 'tsyringe';
import {
  GetSubcategoriesDTO,
  GetSubcategoriesOutputDTO,
} from './dtos/get-subcategories.dto';
import { CategoryNotFoundError } from './errors/category-not-found.error';
import { CategoryRepositoryInterface } from './repositories/category.repository';

@injectable()
export class GetSubcategoriesUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepo: CategoryRepositoryInterface
  ) {}

  async execute({
    name,
    page = 1,
    take = 20,
  }: GetSubcategoriesDTO): Promise<GetSubcategoriesOutputDTO> {
    // Se o nome da caegoria mãe for especificada, mostra suas subcategorias
    const category = await this.categoryRepo.findByName(name);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    const result = await this.categoryRepo.findWithActiveStreams({
      categoryId: category.id,
      page,
      take,
    });

    return result;
  }
}
