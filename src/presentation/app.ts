import fastify from "fastify";
import { ENV_DATA } from "../infrastructure/config";

const app = fastify({ logger: true });

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
