import { Request, Response, NextFunction } from "express";
import Logger from "../../logger/logger";
import { NftMetadataRequest } from "./interface";
import MetadataService from "./service";
import {
  ApiError,
  ApiErrorTypeEnum,
} from "../middlewares/error-handling-middleware";

export async function uploadMetadata(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const request: NftMetadataRequest = req.body;

    if (!request.uploadId || !request.fileNames || !request.baseUrl) {
      throw new ApiError(
        ApiErrorTypeEnum.VALIDATION,
        "Required body parameters (uploadId, fileNames, baseUrl) are missing."
      );
    }

    Logger.info(`Upload Request Received: ${req.body}`);

    const { deploymentId, url, spheronUrl } =
      await MetadataService.uploadMetadata(
        request.uploadId,
        request.fileNames,
        request.baseUrl
      );

    res.status(200).json({
      uploadId: deploymentId,
      spheronUrl,
      url,
    });
  } catch (error) {
    Logger.error(`Error in ${__filename} - uploadMetadata - ${error.message}`);
    next(error);
  }
}
