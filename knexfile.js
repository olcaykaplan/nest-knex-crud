// Update with your config settings.

/**
 * @type {Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      filename: './dev.sqlite3',
      database: 'knex_crud',
      user: 'root',
      password: '728096Ok',
    },
  },
};
