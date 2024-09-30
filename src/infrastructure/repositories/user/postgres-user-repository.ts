import { databaseInstance } from "../../../database";
import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user";

export class PostgresUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await databaseInstance<User>("users").where({ id }).first();

    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await databaseInstance<User>("users").where({ email }).first();

    return user ?? null;
  }

  async findAll(): Promise<User[]> {
    const users = await databaseInstance<User>("users").select();

    return users;
  }

  async save(user: User): Promise<void> {
    const userAlreadyExists = await this.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new Error("User already batata");
    }

    await databaseInstance("users").insert(user);
  }

  async delete(id: string): Promise<void> {
    await databaseInstance("users").where({ id }).delete();
  }
}
