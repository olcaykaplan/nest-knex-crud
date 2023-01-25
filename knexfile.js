// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config();

/**
 * @type {Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      filename: './dev.sqlite3',
      database: 'knex_crud',   
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PW,
    },
  },
};
