import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import 'reflect-metadata';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const typeorm = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  retryAttempts: 2,
  retryDelay: 3000,
  ssl: true,
  autoLoadEntities: true,
  logging: true,
  keepConnectionAlive: true,
  synchronize: true,
} satisfies TypeOrmModuleOptions;

export default registerAs('typeorm', () => typeorm);

export const connectionSource = new DataSource(typeorm as DataSourceOptions);
