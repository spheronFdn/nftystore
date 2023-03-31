import { NextFunction, Request, Response } from "express";
import Logger from "../../logger/logger";

export enum ApiErrorTypeEnum {
  VALIDATION = "Validation",
  NOT_FOUND = "Not Found",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  CONFLICT = "Conflict",
}

export class ApiError extends Error {
  apiErrorType: ApiErrorTypeEnum;

  constructor(apiErrorType: ApiErrorTypeEnum, message?: string) {
    super(message ?? apiErrorType);
    this.apiErrorType = apiErrorType;
  }
}

export function errorLoggingMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  Logger.error(
    `Error Middleware: ${error.message} | Request path: ${req.path} | Stack: ${error.stack}`
  );
  next(error);
}

export function errorHandlingMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    return;
  }
  let message = error.message;
  let statusCode = 500;
  if (error instanceof ApiError) {
    switch (error.apiErrorType) {
      case ApiErrorTypeEnum.VALIDATION:
        statusCode = 400;
        break;
      case ApiErrorTypeEnum.UNAUTHORIZED:
        statusCode = 401;
        break;
      case ApiErrorTypeEnum.NOT_FOUND:
        statusCode = 404;
        break;
      case ApiErrorTypeEnum.FORBIDDEN:
        statusCode = 403;
        break;
      case ApiErrorTypeEnum.CONFLICT:
        statusCode = 409;
        break;
      default:
    }
    if (!message) {
      message = error.apiErrorType;
    }
  }
  res.status(statusCode).json({
    error: true,
    message,
  });
}
