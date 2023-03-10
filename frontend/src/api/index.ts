import axios from "axios";
import {
  IUploadFilePayloadDto,
  IUploadMetadataResponse,
  IUploadResponse,
} from "../common/types";

const BASE_URI = "http://localhost:8088";

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
  formData.append("apiToken", apiToken);
  try {
    const response = await axios({
      url: `${BASE_URI}/uploadCollection?protocol=${protocol}&${projectName}`,
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
      url: `${BASE_URI}/uploadMetadata?protocol=${protocol}&uploadId=${uploadId}`,
      data: { uploadId, fileNames, baseUrl: url, apiToken },
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
