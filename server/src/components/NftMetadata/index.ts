import { Request, Response, NextFunction } from "express";
import Logger from "../../logger/logger";
import { NftMetadataRequest } from "./interface";

export async function generateMetadataURI(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    Logger.info(`Upload Request Received: ${req.body}`);

    const metadataReq: NftMetadataRequest = req.body;

    res.status(200).json({});
  } catch (error) {
    Logger.error(
      `Error in ${__filename} - generateMetadataURI - ${error.message}`
    );
    next(error);
  }
}
