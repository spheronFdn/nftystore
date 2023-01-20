import axios from "axios";

const BASE_URI = "http://localhost:8088";

export const uploadFiles = async (protocol: string, files: any) => {
  let formData = new FormData();

  files.forEach((file: any) => formData.append(file.name, file));
  formData.append("protocol", protocol);
  try {
    const response = await axios({
      url: `${BASE_URI}/uploadCollection`,
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
