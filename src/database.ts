import { knex as configKnex, Knex } from "knex";
import { ENV_DATA } from "./env";

const connectionConfig: Knex.Config = {
  client: "pg",
  connection: {
    filename: ENV_DATA.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./database/migrations",
  },
};

const databaseInstance = configKnex(connectionConfig);

export { connectionConfig, databaseInstance };
