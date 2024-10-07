import { UserRepository, UserSchema } from "./user-repository";

export class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, UserSchema>();

  async findById(id: string): Promise<UserSchema | null> {
    const user = this.users.get(id);
    if (user) {
      await Promise.resolve(this.users.get(id));
    }

    return null;
  }

  async findByEmail(email: string): Promise<UserSchema | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        await Promise.resolve(user);
      }
    }

    return null;
  }

  async create(user: UserSchema): Promise<UserSchema> {
    this.users.set(user.id, user);

    return Promise.resolve(user);
  }

  async delete(id: string): Promise<void> {
    await Promise.resolve(this.users.delete(id));
  }

  async findAll(): Promise<UserSchema[]> {
    const users = await Promise.resolve(Array.from(this.users.values()));

    return users;
  }
}
