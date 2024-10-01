import "knex/types/tables";
import { Knex } from "knex";

// Extending the Knex types
declare module "knex/types/tables" {
  interface UserDB {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    role: string;
    validated: boolean;
    created_at: string;
    updated_at?: string;
  }

  interface Tables {
    users: UserDB;

    users_composite: Knex.CompositeTableType<
      UserDB,
      Partial<UserDB> & { updated_at: string },
      Partial<Omit<UserDB, "id">>
    >;
  }
}
