import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('genres', (table) => {
    table.uuid('genreId').primary().defaultTo(knex.raw('(UUID())'));
    table.string('name', 100).unique().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('genres');
}
