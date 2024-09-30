import { EmailAlreadyExistsException } from "../../../domain/exceptions/email-already-exists";
import { PostgresUserRepository } from "../../../infrastructure/repositories/user/postgres-user-repository";
import { UserMapper } from "../../../shared/utils/user-mapper";
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
} from "../../dtos/user/create-user";

export class CreateUserUseCase {
  constructor(private userRepository: PostgresUserRepository) {}

  async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new EmailAlreadyExistsException();
    }

    const user = UserMapper.toEntity(data);

    await this.userRepository.save(user);

    return UserMapper.toResponse(user);
  }
}
