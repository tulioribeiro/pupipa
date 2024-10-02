import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../../application/use-cases/user/create-user";
import { UserMapper } from "../../shared/utils/user-mapper";
import { CreateUserRequest } from "../../shared/interfaces/fastify/user";
import { handleException } from "../../shared/utils/exception-handler";

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
      const { code, message } = handleException(error);

      reply.code(code).send(message);
    }
  }
}
