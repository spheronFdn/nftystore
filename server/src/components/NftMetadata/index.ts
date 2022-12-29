import { Request, Response, NextFunction } from "express";
import Logger from "../../logger/logger";
import { NftMetadataRequest } from "./interface";
import MetadataService from "./service";
import {
  ApiError,
  ApiErrorTypeEnum,
} from "../middlewares/error-handling-middleware";
import { ProtocolEnum } from "../UploadCollection";

export async function generateMetadataURI(
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

    Logger.info(`Upload Request Received: ${req.body}`);

    const metadataReq: NftMetadataRequest = req.body;

    const { deploymentId, url } = await MetadataService.generateMetadata(
      metadataReq,
      protocol
    );

    res.status(200).json({
      nftMetadata: JSON.stringify(metadataReq),
      url: url,
    });
  } catch (error) {
    Logger.error(
      `Error in ${__filename} - generateMetadataURI - ${error.message}`
    );
    next(error);
  }
}
