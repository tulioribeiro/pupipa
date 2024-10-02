import { User } from "../../../domain/entities/user";
import { EmailAlreadyExistsException } from "../../../domain/exceptions/email-already-exists";
import { PostgresUserRepository } from "../../../infrastructure/repositories/user/postgres-user-repository";

export class CreateUserUseCase {
  constructor(private userRepository: PostgresUserRepository) {}

  async execute(data: User): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new EmailAlreadyExistsException();
    }

    return await this.userRepository.create(data);
  }
}
