import { FastifyReply, FastifyRequest } from "fastify";
import { SignInUseCase } from "../../application/use-cases/auth/sign-in";
import {
  RefreshTokenRequest,
  SignInRequest,
} from "../../shared/interfaces/fastify/auth";
import { handleException } from "../../shared/utils/exception-handler";
import { RefreshTokenUseCase } from "../../application/use-cases/auth/refresh-token";

export class AuthController {
  readonly #signInUseCase;
  readonly #refreshTokenUseCase;

  constructor(
    signInUseCase: SignInUseCase,
    refreshTokenUseCase: RefreshTokenUseCase
  ) {
    this.#signInUseCase = signInUseCase;
    this.#refreshTokenUseCase = refreshTokenUseCase;
  }

  async signIn(request: FastifyRequest<SignInRequest>, reply: FastifyReply) {
    try {
      const { email, password } = request.body;
      const user = await this.#signInUseCase.execute({ email, password });

      const token = await reply.jwtSign(
        {},
        {
          sub: user.id,
        }
      );

      reply.code(200).send({ token });
    } catch (error) {
      const { code, message } = handleException(error);

      reply.code(code).send(message);
    }
  }

  async refreshToken(
    request: FastifyRequest<RefreshTokenRequest>,
    reply: FastifyReply
  ) {
    const { refreshToken } = request.body;

    const accessToken = await this.#refreshTokenUseCase.execute(refreshToken);
    try {
      reply.code(200).send(accessToken);
    } catch (error) {
      const { code, message } = handleException(error);

      reply.code(code).send(message);
    }
  }
}
