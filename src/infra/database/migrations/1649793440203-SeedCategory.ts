import { MigrationInterface } from 'typeorm';
import { AppDataSource } from '../../orm/typeorm';
import { PrimaryCategorySeed } from '../seeds/category/root_categories.seed';
import { GameCategorySeed } from '../seeds/category/game_category.seed';
import { CategoryModel } from '@/infra/orm/typeorm/models/Category';

export class SeedCategory1649793440203 implements MigrationInterface {
  public async up(): Promise<void> {
    const categoryRepository = AppDataSource.getTreeRepository(CategoryModel);
    const savedCategories = await categoryRepository.save(PrimaryCategorySeed);

    const gamesCategory = savedCategories.find((item) => item.name === 'Jogos');
    const promises = GameCategorySeed.map(async (game) => {
      game.parent = gamesCategory;
      await categoryRepository.save(game);
    });

    await Promise.all(promises);
  }

  public async down(): Promise<void> {}
}
