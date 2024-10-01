import fastify from "fastify";
import { ENV_DATA } from "../infrastructure/config";
import { userRoutes } from "./routes/user";

const app = fastify({ logger: true });

app.register(userRoutes);

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
