import { z } from 'zod';

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DATABASE_AUTH_TOKEN: z.string().min(1, "DATABASE_AUTH_TOKEN is required"),
  CORS_ORIGIN: z.string().min(1, "CORS_ORIGIN is required"),
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
  BETTER_AUTH_URL: z.string().min(1, "BETTER_AUTH_URL is required"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
});

function loadEnv() {
  const skipValidation = !!process.env.SKIP_ENV_VALIDATION;
  const serverEnvVars = {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  };

  let server: z.infer<typeof serverEnvSchema>;
  if (!skipValidation) {
    server = serverEnvSchema.parse(serverEnvVars);
  } else {
    server = serverEnvVars as z.infer<typeof serverEnvSchema>;
  }

  return {
    ...server,
    _skipValidation: skipValidation,
  };
}

export const env = loadEnv();