import fs from "fs";
import Logger from "../../logger/logger";
import { FileUtils } from "../Utils/file-utils";
import FormData from "form-data";
import HostingApi from "../HostingApi/service";
import IDeployment from "../HostingApi/deployment-interface";
import config from "../../config/config";
import {
  IMAGE_UPLOAD_PREFIX,
  JSON_EXTENSION,
  METADATA_UPLOAD_PREFIX,
} from "../Utils/constants";
import { safePromise } from "../Utils/helpers";

class MetadataService {
  async uploadMetadata(
    uploadId: string,
    fileNames: string[],
    baseUrl: string,
    apiToken?: string
  ): Promise<{
    deploymentId: string;
    url: string;
    spheronUrl: string;
  }> {
    let uploadDir: string = "";
    try {
      Logger.info(`Uploading metadata files for : ${uploadId}`);

      const deployment: IDeployment = await HostingApi.getDeployment(
        uploadId,
        apiToken
      );
      uploadDir = deployment.project.name;

      const form = this.createMetadataForm(fileNames, baseUrl, uploadDir);

      const { deploymentId, url, spheronUrl } = await HostingApi.uploadFiles(
        deployment.protocol,
        uploadDir.replace(
          `${IMAGE_UPLOAD_PREFIX}-`,
          `${METADATA_UPLOAD_PREFIX}-`
        ),
        form,
        apiToken
      );

      return {
        deploymentId: deploymentId,
        url: url,
        spheronUrl: `https://${spheronUrl}`,
      };
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - uploadCollection - ${error.message}`
      );
      throw error;
    } finally {
      safePromise(FileUtils.deleteDir(uploadDir));
    }
  }

  private createMetadataForm(
    fileNames: string[],
    baseUrl: string,
    uploadDir: string
  ): FormData {
    const form = new FormData();

    for (let image of fileNames) {
      const fileName = image.split(".")[0];
      const fullPathMetaFile = `${config.rootUploadDirectory}/${uploadDir}/${fileName}.json`;

      let rawdata = fs.readFileSync(fullPathMetaFile);

      if (!rawdata) {
        throw new Error(`Missing json file for ${image}`);
      }

      let metadata = JSON.parse(rawdata.toString());
      metadata.image = `${
        baseUrl.includes("https://") ? "" : "https://"
      }${baseUrl}/${image}`;

      fs.writeFileSync(fullPathMetaFile, JSON.stringify(metadata));

      form.append(
        `${fileName}.${JSON_EXTENSION}`,
        fs.createReadStream(fullPathMetaFile)
      );
    }

    return form;
  }
}


export default new MetadataService();
