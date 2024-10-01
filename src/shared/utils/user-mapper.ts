import { UserDB } from "knex/types/tables";
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
} from "../../application/dtos/user/create-user";
import { User, UserData } from "../../domain/entities/user";
import { UserRole } from "../../domain/enums/role";

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

  fromDB(raw: UserDB): User {
    const userData: UserData = {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password_hash,
      role: raw.role as UserRole, // @FIXME: This is a workaround for the type mismatch
      validatedEmail: raw.validated,
      createdAt: new Date(raw.created_at),
      updatedAt: raw.updated_at ? new Date(raw.updated_at) : undefined,
    };

    console.log(userData.password);

    return User.fromData(userData);
  },
};
