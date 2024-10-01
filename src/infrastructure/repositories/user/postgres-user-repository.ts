import { User } from "../../../domain/entities/user";
import { EmailAlreadyExistsException } from "../../../domain/exceptions/email-already-exists";
import { UserRepository } from "../../../domain/repositories/user";
import { UserMapper } from "../../../shared/utils/user-mapper";
import { databaseInstance } from "../../database/knexfile";

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

  async create(user: User): Promise<User> {
    const userAlreadyExists = await this.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new EmailAlreadyExistsException();
    }

    const [createdUser] = await databaseInstance("users")
      .insert({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        password_hash: user.password,
      })
      .returning("*");

    return UserMapper.fromDB(createdUser);
  }

  async delete(id: string): Promise<void> {
    await databaseInstance("users").where({ id }).delete();
  }
}
