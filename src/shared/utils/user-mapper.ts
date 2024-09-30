import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
} from "../../application/dtos/user/create-user";
import { User } from "../../domain/entities/user";

export const UserMapper = {
  toResponse(user: User): CreateUserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      validatedEmail: user.validatedEmail,
      role: user.role,
    };
  },

  toEntity(dto: CreateUserRequestDTO): User {
    return new User({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
  },
};
