import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../../application/use-cases/user/create-user";
import { CreateUserRequestDTO } from "../../application/dtos/user/create-user";
import { ValidationException } from "../../domain/exceptions/validation";
import { EmailAlreadyExistsException } from "../../domain/exceptions/email-already-exists";
import { UserMapper } from "../../shared/utils/user-mapper";

export class UserController {
  readonly #createUserUseCase: CreateUserUseCase;

  constructor(createUserUsecase: CreateUserUseCase) {
    this.#createUserUseCase = createUserUsecase;
  }

  async createUser(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    return this.#handleCreateUser(request, reply);
  }

  async #handleCreateUser(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const data = request.body as CreateUserRequestDTO;

      const userEntity = UserMapper.toEntity(data);

      const createdUser = await this.#createUserUseCase.execute(userEntity);

      reply.code(201).send(createdUser);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsException) {
        reply.code(409).send({ message: error.toResponse() });

        return;
      }

      if (error instanceof ValidationException) {
        reply.code(400).send(error.toResponse());

        return;
      }

      reply
        .code(500)
        .send({ message: "Internal server error. Please try again later." });
    }
  }
}
