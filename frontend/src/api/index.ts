import axios from "axios";
import { IUploadFilePayloadDto, IUploadResponse } from "../common/types";

const BASE_URI = "http://localhost:8088";

const headers = { "Content-Type": "multipart/form-data" };

export const uploadFiles = async (
  protocol: string,
  files: IUploadFilePayloadDto
): Promise<IUploadResponse> => {
  let formData = new FormData();
  files.images.forEach((image: File) => formData.append("", image));
  files.metadata.forEach((metadata: File) => formData.append("", metadata));
  formData.append("protocol", protocol);
  try {
    const response: IUploadResponse = await axios({
      url: `${BASE_URI}/uploadCollection?protocol=${protocol}`,
      data: formData,
      method: "POST",
      headers,
    });
    return response;
  } catch (error) {
    console.log("ERROR: ", error);
    throw new Error(error as string);
  }
};

export const generateMetadata = async (
  uploadId: string,
  url: string
): Promise<any> => {
  let formData = new FormData();
  formData.append("uploadId", uploadId);
  formData.append("url", url);

  try {
    const response = await axios({
      url: `${BASE_URI}/generateMetadataURI`,
      data: formData,
      method: "POST",
      headers,
    });
    return response;
  } catch (error) {
    console.log("ERROR: ", error);
    throw new Error(error as string);
  }
};
