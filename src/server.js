require("dotenv").config();
const app = require("./app");
const config = require("./config");
const { testConnection, closePool } = require("./database/connection");
const { validateEnv } = config;

validateEnv();

const PORT = config.server.port;

const startServer = async () => {
  await testConnection();

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${config.server.env}`);
    console.log(`http://localhost:${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received. Starting graceful shutdown...`);
    server.close(async () => {
      console.log("HTTP server closed");
      await closePool();
      console.log("Process terminated gracefully");
      process.exit(0);
    });
    setTimeout(() => {
      console.error("Forced shutdown after timeout");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("unhandledRejection", (reason) => {
    console.error("UNHANDLED REJECTION:", reason);
    shutdown("UNHANDLED_REJECTION");
  });
  process.on("uncaughtException", (error) => {
    console.error("UNCAUGHT EXCEPTION:", error);
    shutdown("UNCAUGHT_EXCEPTION");
  });
};

startServer();
