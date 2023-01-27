import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('movie_genre', (table) => {
      table.uuid('movieId');
      table.uuid('genreId');
    })
    .table('movie_genre', (table) => {
      table.foreign('movieId').references('movieId').inTable('movies');
      table.foreign('genreId').references('genreId').inTable('genres');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('movie_genre');
}
