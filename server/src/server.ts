import bodyParser from "body-parser";
import cors from "cors";
import config from "./config/config";
import App from "./app";
import uploadController from "./controllers/upload-controller";
import nftMetadataController from "./controllers/metadata-controller";

const app = new App({
  port: +config.port,
  controllers: [uploadController, nftMetadataController],
  middlewares: [
    bodyParser.urlencoded({
      extended: false,
    }),
    bodyParser.json(),
  ],
});

export default app;
