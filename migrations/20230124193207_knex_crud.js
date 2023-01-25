/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .createTable('movies', (table) => {
      table.uuid('movieId').primary().defaultTo(knex.raw('(UUID())'));
      table.string('title', 100).notNullable();
      table.string('content', 500).notNullable();
      table.integer('releasedYear').notNullable();
      table.float('imdbRating').notNullable();
      table.dateTime('createdDate', { precision: 6 }).defaultTo(knex.fn.now(6));
    })
    .createTable('genres', (table) => {
      table.uuid('genreId').primary().defaultTo(knex.raw('(UUID())'));
      table.string('name', 100).notNullable();
    })
    .createTable('movie_genre', (table) => {
      table.uuid('movieId');
      table.uuid('genreId');
    })
    .table('movie_genre', (table) => {
      table.foreign('movieId').references('movieId').inTable('movies');
      table.foreign('genreId').references('genreId').inTable('genres');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('movies')
    .dropTable('genres')
    .dropTable('movie_genre');
};
