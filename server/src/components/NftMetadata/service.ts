import fs from "fs";
import Logger from "../../logger/logger";
import { FileUtils } from "../Utils/FileUtils";
import { NftMetadataRequest } from "./interface";
import FormData from "form-data";
import { v4 as uuidv4 } from "uuid";
import HostingApi from "../HostingApi/service";

class MetadataService {
  async generateMetadata(
    metadataReq: NftMetadataRequest,
    protocol: string
  ): Promise<{ deploymentId: string; url: string }> {
    let uploadDir: string = "";
    try {
      const projectName: string = `fileUpload-${uuidv4()}`;

      Logger.info(
        `Uploading collection: ${projectName}, using protocol: ${protocol}`
      );

      uploadDir = await FileUtils.getDedicatedUploadDir();

      const fileName: string = `${uploadDir}/${metadataReq.name}.json`;

      FileUtils.createFile(fileName, JSON.stringify(metadataReq));

      const form = new FormData();
      form.append(`${metadataReq.name}.json`, fs.createReadStream(fileName));

      return await HostingApi.uploadFiles(protocol, projectName, form);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - uploadCollection - ${error.message}`
      );
    } finally {
      await FileUtils.deleteDir(uploadDir);
    }
  }
}

export default new MetadataService();
