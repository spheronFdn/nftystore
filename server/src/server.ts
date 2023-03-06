import bodyParser from "body-parser";
import cors from "cors";
import config from "./config/config";
import App from "./app";
import uploadController from "./controllers/UploadController";
import nftMetadataController from "./controllers/NftMetadataController";

const app = new App({
  port: +config.port,
  controllers: [uploadController, nftMetadataController],
  middlewares: [
    bodyParser.urlencoded({
      extended: false,
    }),
    bodyParser.json(),
    cors(),
  ],
});

export default app;
