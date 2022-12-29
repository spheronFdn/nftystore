import axios from "axios";

import {
  ApiError,
  ApiErrorTypeEnum,
} from "../middlewares/error-handling-middleware";
import config from "../../config/config";
import IDeployment, { DeploymentStatusEnum } from "./deployment-interface";
import Logger from "../../logger/logger";

enum HttpMethods {
  GET = "GET",
  POST = "POST",
}

export default abstract class HostingApi {
  private static async sendRequest(
    method: HttpMethods,
    url: string,
    // contentType: string,
    data?: any,
    params?: any
  ): Promise<{
    error: boolean;
    message?: string;
    data?: any;
  }> {
    try {
      const response = await axios({
        method,
        url: `${config.hostingApi.hostAddress}${url}`,
        data,
        params: params,
        headers: {
          authorization: `Bearer ${config.hostingApi.apiToken}`,
          // "Content-Type": `${contentType}`,
        },
      });
      return { error: false, data: response.data };
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - sendRequest - url: ${url} - ${error.message}`
      );
      return {
        error: true,
        message: error?.response?.data.message ?? error.message,
      };
    }
  }

  public static async uploadFiles(
    protocol: string,
    projectName: string,
    fileData: any
  ): Promise<{ deploymentId: string; url: string }> {
    try {
      const { error, message, data } = await this.sendRequest(
        HttpMethods.POST,
        "/v1/deployment/upload",
        // "multipart/form-data",
        fileData,
        {
          protocol: protocol,
          project: projectName,
        }
      );

      if (error) {
        throw new ApiError(ApiErrorTypeEnum.VALIDATION, message);
      }

      return {
        deploymentId: data.deploymentId,
        url: data.sitePreview,
      };
    } catch (error) {
      Logger.error(`Error in ${__filename} - uploadFiles - ${error.message}`);
      throw error;
    }
  }

  public static async getDeploymentStatus(
    deploymentId: string
  ): Promise<{ status: string }> {
    try {
      const { error, message, data } = await this.sendRequest(
        HttpMethods.GET,
        `/v1/deployment/${deploymentId}`,
        {}
      );

      if (error) {
        throw new ApiError(ApiErrorTypeEnum.VALIDATION, message);
      }

      return {
        status: data.status,
      };
    } catch (error) {
      Logger.error(`Error in ${__filename} - uploadFiles - ${error.message}`);
      throw error;
    }
  }
}
