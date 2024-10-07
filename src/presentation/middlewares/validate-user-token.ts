import { FastifyReply, FastifyRequest } from "fastify";

export async function validateUserToken(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const publicRoutes = [/^\/auth\/.*$/];

  const isPublicRoute = publicRoutes.some((route) => {
    if (typeof route === "string") {
      return route === request.url;
    } else if (route instanceof RegExp) {
      return route.test(request.url);
    }
    return false;
  });

  if (isPublicRoute) {
    return;
  }

  try {
    await request.jwtVerify();
  } catch {
    return reply.status(401).send({ message: "Unauthorized." });
  }
}
