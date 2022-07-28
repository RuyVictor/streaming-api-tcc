import { MigrationInterface } from 'typeorm';
import { AppDataSource } from '../database';
import { PrimaryCategorySeed } from '../database/seeds/category/primary_category.seed';
import { GameCategorySeed } from '../database/seeds/category/game_category.seed';
import { Category } from '../models/Category';

export class SeedCategory1649793440203 implements MigrationInterface {
  public async up(): Promise<void> {
    const categoryRepository = AppDataSource.getTreeRepository(Category);
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
