import { User } from "../../../domain/entities/user";
import { AuthenticationException } from "../../../domain/exceptions/authentication";
import { ValidationException } from "../../../domain/exceptions/validation";
import { PostgresUserRepository } from "../../../infrastructure/repositories/user/postgres-user-repository";
import { SignInRequestDTO } from "../../../shared/dtos/auth/auth";
import { UserMapper } from "../../../shared/utils/user-mapper";

export class SignInUseCase {
  #userRepository: PostgresUserRepository;

  constructor(userRepository: PostgresUserRepository) {
    this.#userRepository = userRepository;
  }

  async execute({ email, password }: SignInRequestDTO): Promise<User> {
    // @FIXME: validate password length and email format
    if (!email || !password) {
      throw new ValidationException({
        message: "Email and password cannot be empty.",
        // @TODO: better error details
      });
    }

    const existingUser = await this.#userRepository.findByEmail(email);

    if (!existingUser) {
      throw new AuthenticationException("There is no user with this email.");
    }

    const user = UserMapper.toEntity(existingUser);

    if (!user.validatedEmail) {
      throw new AuthenticationException("User email is not validated.");
    }

    if (!user.passwordMatches(password)) {
      throw new AuthenticationException("User or password is incorrect.");
    }

    return user;
  }
}
