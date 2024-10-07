import { User } from "../../../domain/entities/user";
import { ResourceNotFoundException } from "../../../domain/exceptions/resource-not-found";
import { UserRepository } from "../../../infrastructure/repositories/user/user-repository";
import { UserMapper } from "../../../shared/utils/user-mapper";

export class FetchUserProfileUserCase {
  #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
  }

  async execute(id: string): Promise<User> {
    const existingUser = await this.#userRepository.findById(id);

    if (!existingUser) {
      throw new ResourceNotFoundException();
    }

    const user = UserMapper.toEntity(existingUser);

    return user;
  }
}
