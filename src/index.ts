import { logger } from "@/lib/logger.js";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { env } from "./lib/env.js";

export const app = new Hono();

app.get("/", (c) => {
  return c.text("All right.");
});

function run() {
  try {
    serve({
      fetch: app.fetch,
      hostname: env.HOST,
      port: env.PORT,
    });
    logger.info(
      `Service started successfully at http://${env.HOST}:${env.PORT}`,
    );
  } catch (error) {
    logger.error("Failed to start service", error);
    process.exit(1);
  }
}

run();
