import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_HOST: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv.error) {
  console.error(
    "Error parsing environment variables",
    parsedEnv.error.format()
  );

  throw new Error("Error parsing environment variables");
}

export const ENV_DATA = parsedEnv.data;
