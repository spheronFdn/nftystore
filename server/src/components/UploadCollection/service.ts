import fs from "fs";
import Logger from "../../logger/logger";
import { Request } from "express";
import HostingApi from "../HostingApi/service";
import { v4 as uuidv4 } from "uuid";
import FormData from "form-data";
import { FileUtils } from "../Utils/file-utils";
import { IMAGE_UPLOAD_PREFIX, JSON_EXTENSION } from "../Utils/constants";
import { randomBytes } from "crypto";

class UploadService {
  public async uploadCollection(
    protocol: string,
    req: Request,
    projectName?: string
  ): Promise<{
    uploadId: string;
    fileNames: string[];
    url: string;
    spheronUrl: string;
  }> {
    let uploadDir: string = "";
    try {
      projectName = projectName
        ? `${IMAGE_UPLOAD_PREFIX}-projectName`
        : `${IMAGE_UPLOAD_PREFIX}-${randomBytes(5).toString("hex")}`;

      Logger.info(
        `Uploading collection: ${projectName}, using protocol: ${protocol}`
      );

      uploadDir = await FileUtils.getDedicatedUploadDir(projectName);

      await FileUtils.getFiles(req, uploadDir);

      const form = new FormData();
      const fileNames: string[] = [];

      fs.readdirSync(uploadDir).map((fileName) => {
        const [plainFileName, extension] = fileName.split(".");

        if (extension != JSON_EXTENSION) {
          this.checkMetadataForImage(uploadDir, plainFileName);

          form.append(
            fileName,
            fs.createReadStream(`${uploadDir}/${fileName}`)
          );
          fileNames.push(fileName);
        }
      });

      const { deploymentId, url, spheronUrl } = await HostingApi.uploadFiles(
        protocol,
        projectName,
        form
      );

      return {
        uploadId: deploymentId,
        fileNames,
        url,
        spheronUrl: `https://${spheronUrl}`,
      };
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - uploadCollection - ${error.message}`
      );

      await FileUtils.deleteDir(uploadDir);
      throw error;
    }
  }

  private checkMetadataForImage(filePath: string, fileName: string): void {
    try {
      let metadata = fs.readFileSync(
        `${filePath}/${fileName}.${JSON_EXTENSION}`
      );
      JSON.parse(metadata.toString());
    } catch (error) {
      throw new Error(
        `Missing or malformed metadata file for image: ${fileName}!`
      );
    }
  }
}

export default new UploadService();
