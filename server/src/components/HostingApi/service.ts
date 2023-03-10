import axios from "axios";

import {
  ApiError,
  ApiErrorTypeEnum,
} from "../middlewares/error-handling-middleware";
import config from "../../config/config";
import IDeployment, { DeploymentStatusEnum } from "./deployment-interface";
import Logger from "../../logger/logger";
import { IProject } from "./project-interface";

enum HttpMethods {
  GET = "GET",
  POST = "POST",
}

export default abstract class HostingApi {
  private static async sendRequest(
    method: HttpMethods,
    url: string,
    data?: any,
    params?: any,
    apiToken?: string
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
          authorization: `Bearer ${apiToken ?? config.hostingApi.apiToken}`,
        },
      });
      return { error: false, data: response.data };
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - sendRequest - url: ${config.hostingApi.hostAddress}${url} - ${error.message}`
      );
      throw error;
    }
  }

  public static async uploadFiles(
    protocol: string,
    projectName: string,
    fileData: any,
    apiToken?: string
  ): Promise<{
    projectId: string;
    deploymentId: string;
    url: string;
    spheronUrl: string;
  }> {
    try {
      const { error, message, data } = await this.sendRequest(
        HttpMethods.POST,
        "/v1/deployment/upload",
        fileData,
        {
          protocol: protocol,
          project: projectName,
        },
        apiToken
      );

      if (error) {
        throw new ApiError(ApiErrorTypeEnum.VALIDATION, message);
      }

      return {
        projectId: data.projectId,
        deploymentId: data.deploymentId,
        url: data.sitePreview,
        spheronUrl: data.affectedDomains ? data.affectedDomains[0] : null,
      };
    } catch (error) {
      Logger.error(`Error in ${__filename} - uploadFiles - ${error.message}`);
      throw error;
    }
  }

  public static async getDeployment(
    deploymentId: string,
    apiToken?: string
  ): Promise<IDeployment> {
    try {
      const { error, message, data } = await this.sendRequest(
        HttpMethods.GET,
        `/v1/deployment/${deploymentId}`,
        {},
        {},
        apiToken
      );

      if (error) {
        throw new ApiError(ApiErrorTypeEnum.VALIDATION, message);
      }

      return data.deployment;
    } catch (error) {
      Logger.error(`Error in ${__filename} - uploadFiles - ${error.message}`);
      throw error;
    }
  }
}
