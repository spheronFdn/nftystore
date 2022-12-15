import { Request, Response, NextFunction } from "express";
import Logger from "../../logger/logger";

export async function uploadCollection(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    Logger.info(`Upload Request Received: ${req}`);

    res.status(200).json({});
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
    Logger.info(`Upload Request Received: ${req}`);

    res.status(200).json({});
  } catch (error) {
    Logger.error(
      `Error in ${__filename} - uploadCollectionStatus - ${error.message}`
    );
    next(error);
  }
}
