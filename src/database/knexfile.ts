import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'your-host',
      user: 'your-username',
      password: 'your-password',
      database: 'your-database-name',
    },
    migrations: {
      directory: './migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: 'your-host',
      user: 'your-username',
      password: 'your-password',
      database: 'your-database-name',
    },
    migrations: {
      directory: './migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config;
