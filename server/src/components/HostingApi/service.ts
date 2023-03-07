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
    baseUrl?: string
  ): Promise<{
    error: boolean;
    message?: string;
    data?: any;
  }> {
    try {
      const response = await axios({
        method,
        url: `${baseUrl ? baseUrl : config.hostingApi.hostAddress}${url}`,
        data,
        params: params,
        headers: {
          authorization: `Bearer ${config.hostingApi.apiToken}`,
        },
      });
      return { error: false, data: response.data };
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - sendRequest - url: ${url} - ${error.message}`
      );
      throw error;
    }
  }

  public static async uploadFiles(
    protocol: string,
    projectName: string,
    fileData: any
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
        }
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

  // TODO: REMOVE "http://localhost:8080" before deployment
  public static async getDeployment(
    deploymentId: string
  ): Promise<IDeployment> {
    try {
      const { error, message, data } = await this.sendRequest(
        HttpMethods.GET,
        `/v1/deployment/${deploymentId}`,
        // Comment to {}
        {},
        null,
        "http://localhost:8080"
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
