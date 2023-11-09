import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("todos", (table) => {
      table.string("name").notNullable();
      table.timestamp("created_at").defaultTo(knex.raw("now()"));
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("cid").references("id").inTable("users");
      table.boolean("isCompleted").defaultTo(false);
    });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("todos");
}
