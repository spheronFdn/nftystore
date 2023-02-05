import fs from "fs";
import Logger from "../../logger/logger";
import { FileUtils } from "../Utils/FileUtils";
import { Request } from "express";
import FormData from "form-data";
import { v4 as uuidv4 } from "uuid";
import HostingApi from "../HostingApi/service";
import { IProject } from "../HostingApi/project-interface";
import IDeployment from "../HostingApi/deployment-interface";
import config from "../../config/config";

class MetadataService {
  async generateMetadata(
    uploadId: string,
    protocol: string,
    req: Request
  ): Promise<{
    deploymentId: string;
    url: string;
    spheronUrl: string;
  }> {
    let uploadDir: string = "";
    try {
      Logger.info(
        `Uploading json files for : ${uploadId}, using protocol: ${protocol}`
      );

      uploadDir = await FileUtils.getDedicatedUploadDir(uuidv4());

      await FileUtils.getFiles(req, uploadDir);

      const form = new FormData();

      await fs.readdirSync(uploadDir).map((fileName) => {
        form.append(fileName, fs.createReadStream(`${uploadDir}/${fileName}`));
      });

      const fileNames: string[] = fs.readdirSync(uploadDir);

      const deployment: IDeployment = await HostingApi.getDeployment(uploadId);

      // const { deploymentId, url }: { deploymentId: string; url: string } =
      //   await HostingApi.uploadFiles(protocol, deployment.project.name, form);

      // return {
      //   deploymentId: deploymentId,
      //   url: url,
      //   spheronUrl: url,
      // };
      return {
        deploymentId: "deploymentId",
        url: "url",
        spheronUrl: "url",
      };
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - uploadCollection - ${error.message}`
      );
    } finally {
      // await FileUtils.deleteDir(uploadDir);
    }
  }

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
      Logger.info(`Uploading json files for : ${uploadId}`);

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
        metadata.image = `${baseUrl}/${image}`;

        fs.writeFileSync(fullPathMetaFile, JSON.stringify(metadata));

        form.append(`${fileName}.json`, fs.createReadStream(fullPathMetaFile));
      }

      const { deploymentId, url, spheronUrl } = await HostingApi.uploadFiles(
        deployment.protocol,
        uploadDir.replace("nft-", "meta-"),
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
    } finally {
      // await FileUtils.deleteDir(uploadDir);
    }
  }
}

export default new MetadataService();
