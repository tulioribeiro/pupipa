import { FastifyInstance } from "fastify";
import {
  RefreshTokenRequest,
  SignInRequest,
} from "../../shared/interfaces/fastify/auth";
import { validateRequestBody } from "../middlewares/validate-request-body";
import { AuthController } from "../controllers/auth";
import { SignInUseCase } from "../../application/use-cases/auth/sign-in";
import { PostgresUserRepository } from "../../infrastructure/repositories/user/postgres-user-repository";
import { RefreshTokenUseCase } from "../../application/use-cases/auth/refresh-token";

export async function authRoutes(app: FastifyInstance) {
  const userRepository = new PostgresUserRepository();
  const signInUseCase = new SignInUseCase(userRepository);
  const refreshTokenUseCase = new RefreshTokenUseCase();
  const authController = new AuthController(signInUseCase, refreshTokenUseCase);

  app.post<SignInRequest>(
    "/signin",
    { preHandler: validateRequestBody },
    async (request, reply) => {
      await authController.signIn(request, reply);
    }
  );

  app.post<RefreshTokenRequest>("/refresh", async (request, reply) => {
    await authController.refreshToken(request, reply);
  });

  return Promise.resolve();
}
