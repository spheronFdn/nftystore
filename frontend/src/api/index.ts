import axios from "axios";
import {
  IUploadFilePayloadDto,
  IUploadMetadataResponse,
  IUploadResponse,
} from "../common/types";

const BASE_URI = "http://localhost:8088";

export const uploadFiles = async (
  protocol: string,
  files: IUploadFilePayloadDto
): Promise<IUploadResponse> => {
  let formData = new FormData();
  files.images.forEach((image: File) => formData.append("", image));
  files.metadata.forEach((metadata: File) => formData.append("", metadata));
  formData.append("protocol", protocol);
  try {
    const response = await axios({
      url: `${BASE_URI}/uploadCollection?protocol=${protocol}`,
      data: formData,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
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
  url: string
): Promise<IUploadMetadataResponse> => {
  try {
    const response = await axios({
      // Very Important: remove comment
      // url: `${BASE_URI}/uploadMetadata?protocol=${protocol}&uploadId=${uploadId}`,
      // data: { uploadId, fileNames, baseUrl: url },
      // method: "POST",
      // headers: { "Content-Type": "application/json" },
      url: "https://www.google.com/",
      data: {
        uploadId: 1,
        fileNames: "new",
        baseUrl: "https://www.google.com/",
      },
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log("ERROR: ", error);
    throw new Error(error as string);
  }
};
