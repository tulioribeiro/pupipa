import { User } from "../../../domain/entities/user";
import { EmailAlreadyExistsException } from "../../../domain/exceptions/email-already-exists";
import { UserRepository } from "../../../infrastructure/repositories/user/user-repository";
import { CreateUserDTO } from "../../../shared/dtos/user/create-user";
import { UserMapper } from "../../../shared/utils/user-mapper";

export class CreateUserUseCase {
  #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
  }

  async execute(data: CreateUserDTO): Promise<User> {
    const existingUser = await this.#userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new EmailAlreadyExistsException();
    }

    const user = new User(data);

    await this.#userRepository.create(UserMapper.toSchema(user));

    return user;
  }
}
