import "reflect-metadata"
import { DataSource } from "typeorm"

const isProduction = process.env.NODE_ENV == 'production';

const baseDir = isProduction ? 'build' : 'src';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: isProduction ? process.env.DATABASE_HOST : "localhost", // streaming-db,
    port: isProduction ? Number(process.env.DATABASE_PORT) : 3306,
    username: isProduction ? process.env.DATABASE_USERNAME : "test",
    password: isProduction ? process.env.DATABASE_PASSWORD : "test",
    database: isProduction ? process.env.DATABASE_NAME : "test",
    synchronize: isProduction ? false : true,
    logging: false,
    migrationsRun: true,
    entities: [baseDir + "/models/**/*.{ts,js}"],
    migrations: [baseDir + "/migration/**/*.{ts,js}"],
    subscribers: [],
})
