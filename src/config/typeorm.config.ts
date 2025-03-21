import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import 'reflect-metadata';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const typeorm = {
  type: 'postgres',
  host: process.env.TYPEORM_POSTGRES_HOST,
  port: parseInt(process.env.TYPEORM_POSTGRES_PORT, 10),
  username: process.env.TYPEORM_POSTGRES_USER,
  password: process.env.TYPEORM_POSTGRES_PASSWORD,
  database: process.env.TYPEORM_POSTGRES_DB,

  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  retryAttempts: 2,
  retryDelay: 3000,
  // ssl: true,
  autoLoadEntities: true,
  logging: true,
  keepConnectionAlive: true,
  synchronize: true,
} satisfies TypeOrmModuleOptions;

export default registerAs('typeorm', () => typeorm);

export const connectionSource = new DataSource(typeorm as DataSourceOptions);
