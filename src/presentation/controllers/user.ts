import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../../application/use-cases/user/create";
import { UserMapper } from "../../shared/utils/user-mapper";
import { CreateUserRequest } from "../../shared/interfaces/fastify/user";
import { handleException } from "../../shared/utils/exception-handler";
import { FetchUserProfileUserCase } from "../../application/use-cases/user/fetch-profile";

export class UserController {
  readonly #createUserUseCase: CreateUserUseCase;
  readonly #fetchUserProfileUseCase: FetchUserProfileUserCase;

  constructor(
    createUserUsecase: CreateUserUseCase,
    fetchUserProfileUseCase: FetchUserProfileUserCase
  ) {
    this.#createUserUseCase = createUserUsecase;
    this.#fetchUserProfileUseCase = fetchUserProfileUseCase;
  }

  async createUser(
    request: FastifyRequest<CreateUserRequest>,
    reply: FastifyReply
  ): Promise<void> {
    return this.#handleCreateUser(request, reply);
  }

  async fetchUserProfile(request: FastifyRequest, reply: FastifyReply) {
    return this.#handleFetchUserProfile(request, reply);
  }

  async #handleCreateUser(
    request: FastifyRequest<CreateUserRequest>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const data = request.body;
      const createdUser = await this.#createUserUseCase.execute(data);

      const userViewModel = UserMapper.toUserViewModel(createdUser);

      reply.code(201).send(userViewModel);
    } catch (error) {
      const { code, message } = handleException(error);

      reply.code(code).send(message);
    }
  }

  async #handleFetchUserProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = request.user.sub;
      const user = await this.#fetchUserProfileUseCase.execute(id);

      const userViewModel = UserMapper.toUserViewModel(user);

      reply.code(200).send(userViewModel);
    } catch (error) {
      console.log(error);

      const { code, message } = handleException(error);

      reply.code(code).send(message);
    }
  }
}
