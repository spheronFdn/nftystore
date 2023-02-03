import axios from "axios";
import { IUploadFilePayloadDto } from "../common/types";

const BASE_URI = "http://localhost:8088";

export const uploadFiles = async (
  protocol: string,
  files: IUploadFilePayloadDto
) => {
  let formData = new FormData();
  files.images.forEach((image: any) => formData.append("", image));
  files.metadata.forEach((metadata: any) => formData.append("", metadata));
  formData.append("protocol", protocol);
  try {
    const response = await axios({
      url: `${BASE_URI}/uploadCollection?protocol=${protocol}`,
      data: formData,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progress: any) => {
        console.log(progress);
      },
    });
    console.log("RESPONSE: ", response);
    return;
  } catch (error) {
    console.log("ERROR: ", error);
    return;
  }
};
