import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("debug"),
    HOST: z.string().default("localhost"),
    PORT: z.coerce.number().default(8000),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
