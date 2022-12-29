import { Request, Response, NextFunction } from "express";
import UploadService from "./service";
import Logger from "../../logger/logger";
import {
  ApiError,
  ApiErrorTypeEnum,
} from "../middlewares/error-handling-middleware";
import HostingApi from "../HostingApi/service";

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
        `Protocol '${protocol}' is not supported. Please choose from our supported protocols - 'arweave', 'ipfs-filecoin', 'ipfs-pinata'.`
      );
    }

    const {
      deploymentId,
      normalisedFiles,
      url,
    }: { deploymentId: string; normalisedFiles: string[]; url: string } =
      await UploadService.uploadCollection(protocol, req);

    res.status(200).json({
      uploadId: deploymentId,
      normalisedFiles: normalisedFiles,
      baseUrl: url,
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
    Logger.info(`Upload Request Received: ${req.params} `);

    const { uploadId } = req.params;

    const { status } = await HostingApi.getDeploymentStatus(uploadId);

    res.status(200).json({ status: status });
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
  PINATA = "ipfs-pinata",
}
