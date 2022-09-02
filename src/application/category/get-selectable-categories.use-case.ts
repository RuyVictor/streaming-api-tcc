import { injectable, inject } from 'tsyringe';
import { CategoryRepositoryInterface } from './repositories/category.repository';
import { GetSelectableCategoriesOutputDTO } from './dtos/get-selectable-categories.dto';

@injectable()
export class GetSelectableCategoriesUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepo: CategoryRepositoryInterface
  ) {}

  async execute(): Promise<GetSelectableCategoriesOutputDTO> {
    return await this.categoryRepo.findSelectable();
  }
}
