import { injectable, inject } from 'tsyringe';
import { Stream } from '@/domain/stream.entity';
import { EditStreamRequestDTO } from './dtos/edit-stream.dto';
import { StreamRepositoryInterface } from './repositories/stream.repository';
import { CategoryRepositoryInterface } from '../category/repositories/category.repository';
import { StreamNotFoundError } from './errors/stream-not-found.error';
import { CategoryNotFoundError } from '../category/errors/category-not-found.error';

@injectable()
export class EditStreamUseCase {
  constructor(
    @inject('StreamRepository')
    private streamRepo: StreamRepositoryInterface,
    @inject('CategoryRepository')
    private categoryRepo: CategoryRepositoryInterface
  ) {}

  async execute({
    userId,
    title,
    categoryId,
    description,
  }: EditStreamRequestDTO): Promise<Stream> {
    const foundStream = await this.streamRepo.findByHostId(userId);

    if (!foundStream) {
      throw new StreamNotFoundError();
    }

    await this.streamRepo.edit({
      streamId: foundStream.id,
      title,
      description,
    });

    if (categoryId) {
      const foundCategory = await this.categoryRepo.findById(categoryId);

      if (!foundCategory) {
        throw new CategoryNotFoundError();
      }

      await this.streamRepo.edit({
        streamId: foundStream.id,
        category: foundCategory,
      });
    }

    const stream = await this.streamRepo.findById(foundStream.id);

    return stream;
  }
}
