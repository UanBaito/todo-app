import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("users", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("name", 40).notNullable();
      table.date("created_at").defaultTo(knex.raw("now()"));
      table.string("pwd_hash").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable("users");
}
