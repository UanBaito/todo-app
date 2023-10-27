import "dotenv/config"
import knex from "knex"

const _pg = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DB_URL,
  }
});
