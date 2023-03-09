import { Request, Response, NextFunction } from "express";
import UploadService from "./service";
import Logger from "../../logger/logger";
import {
  ApiError,
  ApiErrorTypeEnum,
} from "../middlewares/error-handling-middleware";
import HostingApi from "../HostingApi/service";
import IDeployment from "../HostingApi/deployment-interface";

export async function uploadCollection(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    Logger.info(`Upload Request Received: ${req.query.protocol} `);

    if (!req.query.protocol) {
      throw new ApiError(
        ApiErrorTypeEnum.VALIDATION,
        "Required query parameters are missing. Required query parameter is protocol"
      );
    }

    const protocol = String(req.query.protocol);
    if (Object.values(ProtocolEnum).indexOf(protocol as ProtocolEnum) === -1) {
      throw new ApiError(
        ApiErrorTypeEnum.VALIDATION,
        `Protocol '${protocol}' is not supported. Please choose from our supported protocols - 'arweave', 'ipfs-filecoin', 'ipfs'.`
      );
    }

    const projectName = String(req.query.projectName);

    const { uploadId, fileNames, url, spheronUrl } =
      await UploadService.uploadCollection(protocol, req, projectName);

    res.status(200).json({
      uploadId,
      fileNames,
      baseUrl: url,
      spheronUrl,
    });
  } catch (error) {
    Logger.error(
      `Error in ${__filename} - uploadCollection - ${error.message}`
    );
    next(error);
  }
}

export async function uploadCollectionStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { uploadId } = req.params;
    Logger.info(`Get upload status request received: ${uploadId} `);

    const deployment: IDeployment = await HostingApi.getDeployment(uploadId);

    res.status(200).json({ status: deployment.status });
  } catch (error) {
    Logger.error(
      `Error in ${__filename} - uploadCollectionStatus - ${error.message}`
    );
    next(error);
  }
}

export enum ProtocolEnum {
  ARWEAVE = "arweave",
  FILECOIN = "ipfs-filecoin",
  IPFS = "ipfs",
}
