import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";

import { ENV_DATA } from "../infrastructure/config";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";
import { validateUserToken } from "./middlewares/validate-user-token";

const app = fastify({ logger: true });

app.register(fastifyJwt, {
  secret: ENV_DATA.JWT_SECRET,
});

app.register(userRoutes, {
  prefix: "/users",
});
app.register(authRoutes, {
  prefix: "/auth",
});

app.addHook("onRequest", validateUserToken);

const start = async () => {
  try {
    await app.listen({
      port: ENV_DATA.PORT,
      host: "0.0.0.0",
    });

    app.log.info(
      `pupipa api is up and running on port ${ENV_DATA.PORT.toString()}`
    );
  } catch (error) {
    app.log.error(error);
  }
};

void start();
