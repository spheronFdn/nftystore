import axios from "axios";
import {
  IUploadFilePayloadDto,
  IUploadMetadataResponse,
  IUploadResponse,
} from "../common/types";
import config from "../config/config";

export const uploadFiles = async (
  protocol: string,
  projectName: string,
  apiToken: string,
  files: IUploadFilePayloadDto
): Promise<IUploadResponse> => {
  let formData = new FormData();
  files.images.forEach((image: File) => formData.append("", image));
  files.metadata.forEach((metadata: File) => formData.append("", metadata));
  formData.append("protocol", protocol);
  formData.append("projectName", projectName);
  try {
    const response = await axios({
      url: `${config.api.API_URL}/uploadCollection?protocol=${protocol}&projectName=${projectName}`,
      data: formData,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("ERROR: ", error);
    throw new Error(error as string);
  }
};

export const uploadMetadata = async (
  protocol: string,
  uploadId: string,
  fileNames: string[],
  url: string,
  apiToken: string
): Promise<IUploadMetadataResponse> => {
  try {
    const response = await axios({
      url: `${config.api.API_URL}/uploadMetadata?protocol=${protocol}&uploadId=${uploadId}`,
      data: { uploadId, fileNames, baseUrl: url },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("ERROR: ", error);
    throw new Error(error as string);
  }
};
