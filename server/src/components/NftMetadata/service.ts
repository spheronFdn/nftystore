import fs from "fs";
import Logger from "../../logger/logger";
import { FileUtils } from "../Utils/file-utils";
import { Request } from "express";
import FormData from "form-data";
import { v4 as uuidv4 } from "uuid";
import HostingApi from "../HostingApi/service";
import { IProject } from "../HostingApi/project-interface";
import IDeployment from "../HostingApi/deployment-interface";
import config from "../../config/config";
import {
  IMAGE_UPLOAD_PREFIX,
  JSON_EXTENSION,
  METADATA_UPLOAD_PREFIX,
} from "../Utils/constants";

class MetadataService {
  async uploadMetadata(
    uploadId: string,
    fileNames: string[],
    baseUrl: string
  ): Promise<{
    deploymentId: string;
    url: string;
    spheronUrl: string;
  }> {
    let uploadDir: string = "";
    try {
      Logger.info(`Uploading metadata files for : ${uploadId}`);

      const deployment: IDeployment = await HostingApi.getDeployment(uploadId);
      uploadDir = deployment.project.name;

      const form = new FormData();

      for (let image of fileNames) {
        const fileName = image.split(".")[0];
        const fullPathMetaFile = `${config.rootUploadDirectory}/${uploadDir}/${fileName}.json`;

        let rawdata = fs.readFileSync(fullPathMetaFile);

        if (!rawdata) {
          throw new Error(`Missing json file for ${image}`);
        }

        let metadata = JSON.parse(rawdata.toString());
        metadata.image = `https://${baseUrl}/${image}`;

        fs.writeFileSync(fullPathMetaFile, JSON.stringify(metadata));

        form.append(
          `${fileName}.${JSON_EXTENSION}`,
          fs.createReadStream(fullPathMetaFile)
        );
      }

      const { deploymentId, url, spheronUrl } = await HostingApi.uploadFiles(
        deployment.protocol,
        "lumos-nft-collection",
        form
      );

      return {
        deploymentId: deploymentId,
        url: url,
        spheronUrl: spheronUrl,
      };
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - uploadCollection - ${error.message}`
      );
      throw error;
    } finally {
      await FileUtils.deleteDir(uploadDir);
    }
  }
}

export default new MetadataService();
