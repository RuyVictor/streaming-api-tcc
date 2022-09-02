import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

const baseDir = isProduction ? 'build' : 'src';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: isProduction ? process.env.DATABASE_HOST : 'localhost', // streaming-db,
  port: isProduction ? Number(process.env.DATABASE_PORT) : 3306,
  username: isProduction ? process.env.DATABASE_USERNAME : 'test',
  password: isProduction ? process.env.DATABASE_PASSWORD : 'test',
  database: isProduction ? process.env.DATABASE_NAME : 'test',
  synchronize: true,
  logging: false,
  entities: [baseDir + '/infra/orm/typeorm/models/**/*.{ts,js}'],
  migrations: [baseDir + '/infra/database/migrations/**/*.{ts,js}'],
  subscribers: [],
});
