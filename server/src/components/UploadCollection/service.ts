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
  ): Promise<{
    uploadId: string;
    fileNames: string[];
    url: string;
    spheronUrl: string;
  }> {
    let uploadDir: string = "";
    try {
      projectName = projectName ? projectName : `nft-${uuidv4()}`;

      Logger.info(
        `Uploading collection: ${projectName}, using protocol: ${protocol}`
      );

      uploadDir = await FileUtils.getDedicatedUploadDir(projectName);

      await FileUtils.getFiles(req, uploadDir);

      const form = new FormData();
      const fileNames: string[] = [];

      await fs.readdirSync(uploadDir).map((fileName) => {
        const extension: string = fileName.split(".")[1];

        if (extension != "json") {
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
        spheronUrl: spheronUrl,
      };

      // return {
      //   uploadId: "deploymentId",
      //   fileNames,
      //   url: "url",
      //   spheronUrl: "spheronUrl",
      // };
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - uploadCollection - ${error.message}`
      );
    } finally {
      // await FileUtils.deleteDir(uploadDir);
    }
  }
}

export default new UploadService();
