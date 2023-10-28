import "dotenv/config";
import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DB_URL,
  },
});

export default db;
