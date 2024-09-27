import fastify from "fastify";
import { ENV_DATA } from "./env";

const app = fastify();

app
  .listen({
    port: ENV_DATA.PORT,
    host: "0.0.0.0",
  })
  .then(() =>
    console.log("pupipa api is up and running on port", ENV_DATA.PORT)
  );
