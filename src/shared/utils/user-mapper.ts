import { UserSchema } from "knex/types/tables";
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
} from "../dtos/user/create-user";
import { User, UserData } from "../../domain/entities/user";

export const UserMapper = {
  toResponse(user: User): CreateUserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      validatedEmail: user.validatedEmail,
    };
  },

  toEntity(dto: CreateUserRequestDTO): User {
    return new User({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
  },

  fromDB(raw: UserSchema): User {
    const userData: UserData = {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password_hash,
      role: raw.role,
      validatedEmail: raw.validated,
      createdAt: new Date(raw.created_at),
      updatedAt: raw.updated_at ? new Date(raw.updated_at) : undefined,
    };

    console.log(userData.password);

    return User.fromData(userData);
  },
};
