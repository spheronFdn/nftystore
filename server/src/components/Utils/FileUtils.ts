import formidable, { Files, Part, BufferEncoding } from "formidable";
import { Request } from "express";
import Logger from "../../logger/logger";
import fs from "fs";
import config from "../../config/config";
import { v4 as uuidv4 } from "uuid";
import IncomingForm from "formidable/Formidable";

export const FileUtils = {
  async deleteDir(uploadDir: string): Promise<void> {
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
  },
  async getFiles(req: Request, uploadDir: string): Promise<Files> {
    try {
      const form: IncomingForm = formidable({
        uploadDir: uploadDir,
        allowEmptyFiles: true,
        keepExtensions: true,
        multiples: true,
        filter: this.filterFiles,
        filename: getFilename(uploadDir),
      });

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
  },

  filterFiles(part: Part): boolean {
    const subDirs = part.originalFilename?.split("/");
    if (subDirs?.indexOf("..") !== -1) {
      return false;
    }
    return true;
  },

  async getDedicatedUploadDir(projectName: string): Promise<string> {
    try {
      const folderName = `${config.rootUploadDirectory}/${projectName}`;
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
  },

  createFile(fileName: string, content: string): void {
    fs.writeFileSync(fileName, content);
  },
};

function getFilename(uploadDir: string) {
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