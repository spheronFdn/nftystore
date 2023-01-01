import fs from "fs";
import Logger from "../../logger/logger";
import { Request } from "express";
import HostingApi from "../HostingApi/service";
import { v4 as uuidv4 } from "uuid";
import FormData from "form-data";
import { FileUtils } from "../Utils/FileUtils";

class UploadService {
  public async uploadCollection(
    protocol: string,
    req: Request,
    projectName?: string
  ): Promise<{ deploymentId: string; normalisedFiles: string[]; url: string }> {
    let uploadDir: string = "";
    try {
      projectName = projectName ? projectName : `fileUpload-${uuidv4()}`;

      Logger.info(
        `Uploading collection: ${projectName}, using protocol: ${protocol}`
      );

      uploadDir = await FileUtils.getDedicatedUploadDir();

      await FileUtils.getFiles(req, uploadDir);

      const form = new FormData();

      fs.readdirSync(uploadDir).map((fileName) => {
        form.append(fileName, fs.createReadStream(`${uploadDir}/${fileName}`));
      });

      const fileNames: string[] = fs.readdirSync(uploadDir);

      const { deploymentId, url }: { deploymentId: string; url: string } =
        await HostingApi.uploadFiles(protocol, projectName, form);

      return {
        deploymentId: deploymentId,
        normalisedFiles: fileNames,
        url: url,
      };
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - uploadCollection - ${error.message}`
      );
    } finally {
      await FileUtils.deleteDir(uploadDir);
    }
  }
}

export default new UploadService();
