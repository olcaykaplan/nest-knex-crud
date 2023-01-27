import type { Knex } from 'knex';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

const knexConfig: Knex.Config = {
  client: 'mysql',
  connection: {
    filename: './dev.mysql',
    database: configService.get('DATABASE_NAME'),
    user: configService.get('MYSQL_USERNAME'),
    password: configService.get('MYSQL_PW'),
  },
};

module.exports = knexConfig;
