import axios from "axios";

const BASE_URI = "http://localhost:8088";

export const uploadFiles = async (protocol: string, files: any) => {
  const formdata = new FormData();
  files.forEach((file: any) => {
    formdata.append(file.path, file.preview);
  });
  console.log("FORM DATA1: ", formdata);
  try {
    const response = await axios({
      url: `${BASE_URI}/uploadCollection?protocol=${protocol}`,
      data: formdata,
      method: "POST",
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
