import path from "node:path";
import { knex as configKnex, Knex } from "knex";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const config: Knex.Config = {
  debug: true,
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  migrations: {
    extension: "ts",
    directory: path.resolve("migrations"),
  },
  seeds: {
    extension: "ts",
    directory: path.resolve("seeds"),
  },
};

const databaseInstance = configKnex(config);

export default config;

export { databaseInstance };
