import { User } from "../../domain/entities/user";
import { UserViewModelDTO } from "../dtos/user/create-user";
import { UserSchema } from "../../infrastructure/repositories/user/user-repository";
import { UserRole } from "../../domain/enums/user-role";

export const UserMapper = {
  toSchema(user: User): UserSchema {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password_hash: user.password,
      role: user.role,
      validated: user.validatedEmail,
      created_at: user.createdAt,
      updated_at: user.updatedAt ?? null,
    };
  },

  toUserViewModel(user: User): UserViewModelDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      validated: user.validatedEmail,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },

  toEntity(user: UserSchema): User {
    const isPasswordHashed = true;

    return new User(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password_hash,
        role: user.role as UserRole,
        validatedEmail: user.validated,
        createdAt: user.created_at,
        updatedAt: user.updated_at ?? undefined,
      },
      isPasswordHashed
    );
  },
};
