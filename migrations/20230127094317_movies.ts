import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('movies', (table) => {
    table.uuid('movieId').primary().defaultTo(knex.raw('(UUID())'));
    table.string('title', 100).notNullable();
    table.string('content', 500).notNullable();
    table.integer('releasedYear').notNullable();
    table.float('imdbRating').notNullable();
    table.dateTime('createdDate', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('movies');
}
