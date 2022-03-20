import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

interface Config {
  JWT_SECRET_KEY: string;
  PORT: number;
  ADDITIONAL_DB_OPTIONS: Pick<ConnectionOptions, 'entities' | 'migrations' | 'cli'>;
}

const CONFIG: Config = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'dev-secret-key',
  PORT: parseInt(String(process.env.PORT), 10) || 3003,
  ADDITIONAL_DB_OPTIONS: {
    entities: [
      process.env.NODE_ENV === 'production'
        ? 'server/dist/app/entities/*.js'
        : 'server/app/entities/*.ts'
    ],
    migrations: ['server/dist/app/migrations/*.js'],
    cli: {
      migrationsDir: 'server/app/migrations'
    }
  }
};

export default CONFIG;
