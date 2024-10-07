export interface UserSchema {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: "admin" | "user";
  validated: boolean;
  created_at: Date;
  updated_at: Date | null;
}

export interface UserRepository {
  findById(id: string): Promise<UserSchema | null>;
  findByEmail(email: string): Promise<UserSchema | null>;
  create(user: UserSchema): Promise<UserSchema>;
  delete(id: string): Promise<void>;
  findAll(): Promise<UserSchema[]>;
}
