// eslint-disable-next-line no-undef
exports.up = async function (knex) {
  await knex.schema.createTable('form_entries', table => {
    table.specificType('id', 'CHAR(16)').primary();
    table.string('slug', 60).notNullable().unique();
    table.string('title', 80).notNullable();
    table.text('content');
    table.timestamp('publishedAt');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable();
  })
}

// eslint-disable-next-line no-undef
exports.down = async function (knex) {
  await knex.schema.dropTable('form_entries')
}