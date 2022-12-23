import fs from "fs";

import Logger from "../../logger/logger";
import formidable, { Files, Part } from "formidable";
import IncomingForm from "formidable/Formidable";
import config from "../../config/config";
import { Request } from "express";
import HostingApi from "../HostingApi/service";
import { v4 as uuidv4 } from "uuid";
import IDeployment from "../HostingApi/deployment-interface";
import FormData from "form-data";

class UploadService {
  public async uploadCollection(
    protocol: string,
    req: Request,
    projectName?: string
  ): Promise<{ deploymentId: string; url: string }> {
    projectName = projectName ? projectName : `fileUpload-${uuidv4()}`;

    const uploadDir: string = await this.getDedicatedUploadDir();

    const files: Files = await this.getFiles(req, uploadDir);

    let i = 0;
    const form = new FormData();

    await fs.readdirSync(uploadDir).map((fileName) => {
      const newFileName = `${uploadDir}/${i}.${fileName.split(".")[1]}`;
      fs.renameSync(`${uploadDir}/${fileName}`, newFileName);

      form.append("my_logo", fs.createReadStream(newFileName));
      i++;
    });

    const { deploymentId, url }: { deploymentId: string; url: string } =
      await HostingApi.uploadFiles(protocol, projectName, form);

    return {
      deploymentId: deploymentId,
      url: url,
    };
  }

  private async getFiles(req: Request, uploadDir: string): Promise<Files> {
    try {
      const form: IncomingForm = formidable({
        uploadDir: uploadDir,
        allowEmptyFiles: true,
        keepExtensions: true,
        multiples: true,
        filter: this.filterFiles,
      });

      // let i: number = 0;
      // form.on("file", function (field, file) {
      //   //rename the incoming file to the file's name
      //   const fileExtension: string = file.filepath.split(".")[1];
      //   file.filepath = `${i}.${fileExtension}`;
      //   i++;
      // });

      const { files }: { files: formidable.Files } = await new Promise(
        (resolve, reject) =>
          form.parse(req, (err, fields, files) => {
            if (err) {
              reject(err);
              return;
            }
            resolve({ files });
          })
      );
      return files;
    } catch (error) {
      Logger.error(`Error in ${__filename} - parseForm - ${error.message}`);
      throw error;
    }
  }

  private filterFiles(part: Part): boolean {
    const subDirs = part.originalFilename?.split("/");
    if (subDirs?.indexOf("..") !== -1) {
      return false;
    }
    return true;
  }

  private async getDedicatedUploadDir(): Promise<string> {
    try {
      const folderName = `${config.rootUploadDirectory}/${uuidv4()}`;
      try {
        await fs.promises.access(folderName);
      } catch (error) {
        // folder doesn't exists
        await fs.promises.mkdir(folderName);
      }
      return folderName;
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - getDedicatedUploadDir - ${error.message}`
      );
      throw error;
    }
  }

  private async deleteDir(uploadDir: string): Promise<void> {
    try {
      if (!uploadDir) {
        return;
      }
      await fs.promises.rm(uploadDir, {
        recursive: true,
        force: true,
      });
    } catch (error) {
      Logger.error(`Error in ${__filename} - deleteDir - ${error.message}`);
      throw error;
    }
  }

  private getFilename(uploadDir: string) {
    return (
      name: string,
      ext: string,
      part: formidable.Part,
      form: IncomingForm
    ) => {
      try {
        // Creates subdirectories, if they exist

        const nameWithPath = part.originalFilename;
        const subDirs = part.originalFilename?.split("/");

        if (subDirs && subDirs?.length > 1) {
          subDirs.length = subDirs.length - 1;
          const directoryPath = `${uploadDir}/${subDirs.join("/")}`;
          if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
          }
        }
        return nameWithPath as string;
      } catch (error) {
        Logger.error(`Error in ${__filename} - getFilename - ${error}`);
        throw error;
      }
    };
  }
}

export default new UploadService();
