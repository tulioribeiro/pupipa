import { knex as configKnex, Knex } from "knex";
import { ENV_DATA } from "./env";

const connectionConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: ENV_DATA.DATABASE_HOST,
    user: ENV_DATA.DATABASE_USER,
    password: ENV_DATA.DATABASE_PASSWORD,
    database: ENV_DATA.DATABASE_NAME,
  },
  migrations: {
    extension: "ts",
    directory: "./database/migrations",
  },
};

const databaseInstance = configKnex(connectionConfig);

export { connectionConfig, databaseInstance };
