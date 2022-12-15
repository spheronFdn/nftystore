import Logger from "./logger/logger";
import app from "./server";

app.listen();

process.on("SIGINT", function onSigint() {
  Logger.info(
    "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
    new Date().toISOString()
  );

  app.stop();
});

// quit properly on docker stop
process.on("SIGTERM", function onSigterm() {
  Logger.info(
    "Got SIGTERM (docker container stop). Graceful shutdown ",
    new Date().toISOString()
  );
  app.stop();
});
