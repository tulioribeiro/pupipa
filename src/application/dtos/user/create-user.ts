import { UserRole } from "../../../domain/enums/role";

interface CreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  validatedEmail: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export { CreateUserRequestDTO, CreateUserResponseDTO };
