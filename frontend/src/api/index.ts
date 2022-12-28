import axios from "axios";

const BASE_URI = "http://localhost:8088";

export const uploadFiles = async (
  protocol: string,
  files: Array<Blob> | Array<MediaSource>
) => {
  try {
    const response = await axios({
      url: `${BASE_URI}/uploadCollection`,
      data: { files, protocol },
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
