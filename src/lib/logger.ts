import winston from "winston";

import { env } from "./env.js";

const timezoned = () => {
  return new Date().toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
  });
};

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: winston.format.json(),
});

// if not in production, log to the console
if (env.NODE_ENV !== "production") {
  const logFormat = winston.format.printf(function (info) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { level, message, timestamp, ...meta } = info;
    const metaString =
      meta && Object.keys(meta).length > 0 ? JSON.stringify(meta, null, 2) : "";

    return `${timestamp} [${level}]: ${message} ${metaString}`;
  });

  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: timezoned }),
        winston.format.prettyPrint(),
        winston.format.colorize(),
        logFormat,
      ),
    }),
  );
}
