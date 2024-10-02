import { FastifyInstance } from "fastify";
import { PostgresUserRepository } from "../../infrastructure/repositories/user/postgres-user-repository";
import { CreateUserUseCase } from "../../application/use-cases/user/create-user";
import { UserController } from "../controllers/user";
import { CreateUserRequest } from "../../shared/interfaces/fastify/user";
import { validateRequestBody } from "../middlewares/validate-request-body";

export async function userRoutes(fastify: FastifyInstance) {
  const userRepository = new PostgresUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const userController = new UserController(createUserUseCase);

  fastify.post<CreateUserRequest>(
    "/",
    { preHandler: validateRequestBody },
    async (request, reply) => {
      await userController.createUser(request, reply);
    }
  );

  return Promise.resolve();
}
