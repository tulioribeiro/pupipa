import { FastifyInstance } from "fastify";
import { PostgresUserRepository } from "../../infrastructure/repositories/user/postgres-user-repository";
import { CreateUserUseCase } from "../../application/use-cases/user/create-user";
import { UserController } from "../controllers/user";

export async function userRoutes(fastify: FastifyInstance) {
  const userRepository = new PostgresUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const userController = new UserController(createUserUseCase);

  fastify.post("/users", async (request, reply) => {
    await userController.createUser(request, reply);
  });

  return Promise.resolve();
}
