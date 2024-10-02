import "knex/types/tables";
import { Knex } from "knex";
import { UserRole } from "../domain/enums/role";

// Extending the Knex types
declare module "knex/types/tables" {
  interface UserSchema {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    role: UserRole;
    validated: boolean;
    created_at: string;
    updated_at?: string;
  }

  interface Tables {
    users: UserSchema;

    users_composite: Knex.CompositeTableType<
      UserSchema,
      Partial<UserSchema> & { updated_at: string },
      Partial<Omit<UserSchema, "id">>
    >;
  }
}
