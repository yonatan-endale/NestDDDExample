import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql'; // or your driver

const config: Options = {
  // Required
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'mikrotrial',
  driver: PostgreSqlDriver,
  host: 'localhost',
  port: 5433,
  user: 'admin',
  password: 'P@ssw0rd',
  // Optional
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
    glob: '!(*.d).{js,ts}',
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  logger: console.log.bind(console),
  seeder: {
    path: './dist/seeders',
    pathTs: './src/seeders',
  },
};

export default config;
