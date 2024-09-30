import { UserRepository } from "../../../domain/repositories/user";
import { User } from "../../../domain/entities/user";

export class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async findById(id: string): Promise<User | null> {
    const user = this.users.get(id);
    if (user) {
      await Promise.resolve(this.users.get(id));
    }

    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        await Promise.resolve(user);
      }
    }

    return null;
  }

  async save(user: User): Promise<void> {
    await Promise.resolve(this.users.set(user.id, user));
  }

  async delete(id: string): Promise<void> {
    await Promise.resolve(this.users.delete(id));
  }

  async findAll(): Promise<User[]> {
    const users = await Promise.resolve(Array.from(this.users.values()));

    return users;
  }
}
