import { Request } from "express";
import Logger from "../../logger/logger";

export function getTokenFromHeader(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    Logger.info("No access token in request, using env var.");
    return null;
  }
  const token = authHeader.split(" ")[1];
  Logger.info("Access token found in request.");
  return token;
}

export async function safePromise<T>(
  asyncFunction: Promise<T>,
  errorInfo?: string
): Promise<void> {
  try {
    await asyncFunction;
  } catch (error) {
    Logger.error(`Error safePromise -  ${errorInfo} - ${error.message}`);
  }
}
