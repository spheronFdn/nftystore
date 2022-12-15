import * as express from "express";
import { Application } from "express";
import { Server } from "http";
import config from "./config/config";
import Logger from "./logger/logger";

class App {
  public app: Application;
  public port: number;
  public server!: Server;

  constructor(appInit: { port: number; middlewares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;
    this.middlewares(appInit.middlewares);
    this.routes(appInit.controllers);
    this.assets();
    this.template();

    this.app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS "
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With," +
          " Content-Type, Accept," +
          " Authorization," +
          " Access-Control-Allow-Credentials"
      );
      res.header("Access-Control-Allow-Origin", config.uiUrl);
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
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
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private assets() {
    this.app.use(express.static("public"));
    this.app.use(express.static("views"));
  }

  private template() {
    this.app.set("view engine", "pug");
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
