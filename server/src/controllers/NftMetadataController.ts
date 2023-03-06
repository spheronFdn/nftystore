// eslint-disable-next-line @typescript-eslint/no-var-requires
import config from "../config/config";
import { Router, Request, Response } from "express";
import Logger from "../logger/logger";
import { UploadCollectionComponent } from "../components";

class NftMetadataController {
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(
      "/generateMetadataURI",
      UploadCollectionComponent.uploadCollection
    );
  }
}

const nftMetadataController: NftMetadataController =
  new NftMetadataController();
export default nftMetadataController;
