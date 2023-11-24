const { createLogger, format, transports } = require("winston");
const LokiTransport = require("winston-loki");

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: "Analytics-app" },
  transports: [
    new LokiTransport({
      host: "http://localhost:3100",
      port: 3100,
      json: true,
      labels: { app: "Analytics-App" },
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({ filename: "./logs/saveMeetinglog.log" }),
    new transports.File({ filename: "./logs/sendUpdateData.log" }),
  ],
});

module.exports = logger;
