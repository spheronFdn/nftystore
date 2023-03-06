// eslint-disable-next-line @typescript-eslint/no-var-requires
import config from "../config/config";
import { Router, Request, Response } from "express";
import Logger from "../logger/logger";
import { UploadCollectionComponent } from "../components";

class UploadController {
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(
      "/uploadCollection",
      UploadCollectionComponent.uploadCollection
    );
    this.router.get(
      "/uploadCollection/status",
      UploadCollectionComponent.uploadCollectionStatus
    );
  }
}

const uploadController: UploadController = new UploadController();
export default uploadController;
