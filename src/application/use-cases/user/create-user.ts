import { User } from "../../../domain/entities/user";
import { EmailAlreadyExistsException } from "../../../domain/exceptions/email-already-exists";
import { PostgresUserRepository } from "../../../infrastructure/repositories/user/postgres-user-repository";
import { UserMapper } from "../../../shared/utils/user-mapper";
import { CreateUserResponseDTO } from "../../dtos/user/create-user";

export class CreateUserUseCase {
  constructor(private userRepository: PostgresUserRepository) {}

  async execute(data: User): Promise<CreateUserResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new EmailAlreadyExistsException();
    }

    await this.userRepository.create(data);

    return UserMapper.toResponse(data);
  }
}
