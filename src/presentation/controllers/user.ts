import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../../application/use-cases/user/create-user";
import { ValidationException } from "../../domain/exceptions/validation";
import { EmailAlreadyExistsException } from "../../domain/exceptions/email-already-exists";
import { UserMapper } from "../../shared/utils/user-mapper";
import { CreateUserRequest } from "../../shared/interfaces/fastify/user";

export class UserController {
  readonly #createUserUseCase: CreateUserUseCase;

  constructor(createUserUsecase: CreateUserUseCase) {
    this.#createUserUseCase = createUserUsecase;
  }

  async createUser(
    request: FastifyRequest<CreateUserRequest>,
    reply: FastifyReply
  ): Promise<void> {
    return this.#handleCreateUser(request, reply);
  }

  async #handleCreateUser(
    request: FastifyRequest<CreateUserRequest>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const data = request.body;
      const userEntity = UserMapper.toEntity(data);
      const createdUser = await this.#createUserUseCase.execute(userEntity);

      reply.code(201).send(UserMapper.toResponse(createdUser));
    } catch (error) {
      if (error instanceof EmailAlreadyExistsException) {
        reply.code(409).send(error.toResponse());

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
