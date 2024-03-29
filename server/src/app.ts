import fs from "fs";
import express from "express";
import { Application } from "express";
import { Server } from "http";
import config from "./config/config";
import Logger from "./logger/logger";
import cors from "cors";
import {
  ApiError,
  ApiErrorTypeEnum,
  errorHandlingMiddleware,
  errorLoggingMiddleware,
} from "./components/middlewares/error-handling-middleware";

class App {
  public app: Application;
  public port: number;
  public server!: Server;

  constructor(appInit: { port: number; middlewares: any; controllers: any }) {
    if (!fs.existsSync(config.rootUploadDirectory)) {
      fs.mkdirSync(config.rootUploadDirectory);
    }

    this.app = express();
    this.port = appInit.port;

    this.app.use(
      cors({
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        origin: (origin, callback) => {
          if (!origin || config.uiUrl !== origin) {
            callback(null, true);
          } else {
            callback(
              new ApiError(ApiErrorTypeEnum.FORBIDDEN, "Not allowed by CORS")
            );
          }
        },
        allowedHeaders: [
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Accept",
          "Authorization",
          "Access-Control-Allow-Credentials",
        ],
        credentials: true,
      })
    );

    this.middlewares(appInit.middlewares);
    this.routes(appInit.controllers);

    this.app.use(express.json({ limit: "500mb" }));
    this.app.use(express.urlencoded({ limit: "500mb" }));
    this.app.use(errorLoggingMiddleware);
    this.app.use(errorHandlingMiddleware);
  }
  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    this.app.get("/status", (req, res) => {
      res.status(200).json({ number: 1000 });
    });

    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.server = this.app.listen(this.port, () => {
      Logger.info(`App listening on the :${this.port}`);
    });
  }

  public stop() {
    Logger.info(`Shuting down the server`);
    this.server.close(function onServerClosed(err) {
      if (err) {
        console.error(err);
        process.exitCode = 1;
      }
      process.exit();
    });
  }
}

export default App;
