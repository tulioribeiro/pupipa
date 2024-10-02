import { FastifyReply, FastifyRequest } from "fastify";

export function validateRequestBody(
  request: FastifyRequest,
  reply: FastifyReply,
  next: () => void
): void {
  if (!request.body || Object.keys(request.body).length === 0) {
    reply.code(400).send({
      error: "BadRequest",
      message: "Request body is required.",
      details: { body: ["Request body is required."] },
    });

    return;
  }

  next();
}
