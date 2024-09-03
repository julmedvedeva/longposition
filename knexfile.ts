import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'your_username',
      password: 'your_password',
      database: 'your_password',
    },
    migrations: {
      directory: './src/database/migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'your_username',
      password: 'your_password',
      database: 'your_password',
    },
    migrations: {
      directory: './src/database/migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config;
