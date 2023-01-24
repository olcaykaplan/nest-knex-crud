/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('movies', function (table) {
      table.primary(['movieId']);
      table.increments('movieId');
      table.string('title', 100).notNullable();
      table.string('content', 500).notNullable();
      table.integer('releasedYear').notNullable();
      table.float('imdbRating').notNullable();
      table.dateTime('createdDate', { precision: 6 }).defaultTo(knex.fn.now(6));
    })
    .createTable('genres', function (table) {
      table.primary(['genresId']);
      table.increments('genresId');
      table.string('name', 100).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
