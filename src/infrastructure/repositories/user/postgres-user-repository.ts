import { EmailAlreadyExistsException } from "../../../domain/exceptions/email-already-exists";
import { UserRepository, UserSchema } from "./user-repository";
import { databaseInstance } from "../../database/knexfile";

export class PostgresUserRepository implements UserRepository {
  async findById(id: string): Promise<UserSchema | null> {
    const user = await databaseInstance<UserSchema>("users")
      .where({ id })
      .first();

    return user ?? null;
  }

  async findByEmail(email: string): Promise<UserSchema | null> {
    const user = await databaseInstance<UserSchema>("users")
      .where({ email })
      .first();

    return user ?? null;
  }

  async findAll(): Promise<UserSchema[]> {
    const users = await databaseInstance<UserSchema>("users").select();

    return users;
  }

  async create(user: UserSchema): Promise<UserSchema> {
    const userAlreadyExists = await this.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new EmailAlreadyExistsException();
    }

    const [createdUser] = await databaseInstance<UserSchema>("users")
      .insert(user)
      .returning("*");

    return createdUser;
  }

  async delete(id: string): Promise<void> {
    await databaseInstance("users").where({ id }).delete();
  }
}
