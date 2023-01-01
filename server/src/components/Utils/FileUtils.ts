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
  async getFiles(req: Request, uploadDir: string): Promise<void> {
    try {
      const form: IncomingForm = formidable({
        uploadDir: uploadDir,
        allowEmptyFiles: true,
        keepExtensions: true,
        multiples: true,
        filter: this.filterFiles,
      });

      const fields: any[] = [];

      form.on("field", (fieldName, value) => {
        fields.push({ fieldName, value });
      });

      await new Promise<void>((resolve, reject) =>
        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        })
      );

      let i: number = 0;
      fields.forEach((field) => {
        const [base64, base64Image] = field.value.split(";base64,");

        fs.writeFileSync(
          `${uploadDir}/${i}.${base64.split("/")[1]}`,
          base64Image,
          "base64"
        );
        i++;
      });
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

  async getDedicatedUploadDir(): Promise<string> {
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
  },

  createFile(fileName: string, content: string): void {
    fs.writeFileSync(fileName, content);
  },
};
