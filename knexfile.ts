import { Knex } from 'knex';
import * as dotenv from 'dotenv';


dotenv.config();

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};

export default config;
