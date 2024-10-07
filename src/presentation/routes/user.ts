import { FastifyInstance } from "fastify";
import { PostgresUserRepository } from "../../infrastructure/repositories/user/postgres-user-repository";
import { CreateUserUseCase } from "../../application/use-cases/user/create";
import { FetchUserProfileUserCase } from "../../application/use-cases/user/fetch-profile";
import { UserController } from "../controllers/user";
import { CreateUserRequest } from "../../shared/interfaces/fastify/user";
import { validateRequestBody } from "../middlewares/validate-request-body";

export async function userRoutes(app: FastifyInstance) {
  const userRepository = new PostgresUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const fetchUserProfileUseCase = new FetchUserProfileUserCase(userRepository);
  const userController = new UserController(
    createUserUseCase,
    fetchUserProfileUseCase
  );

  app.get("/", async (request, reply) => {
    await userController.fetchUserProfile(request, reply);
  });

  app.post<CreateUserRequest>(
    "/",
    { preHandler: validateRequestBody },
    async (request, reply) => {
      await userController.createUser(request, reply);
    }
  );

  return Promise.resolve();
}
