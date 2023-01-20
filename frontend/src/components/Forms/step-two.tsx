import React, { useState } from "react";
import { uploadFiles } from "../../api";
import Dropzone from "../Dropzone/image-dropzone";
import JsonDropzone from "../Dropzone/json-dropzone";

const StepOne = () => {
  const [images, setImages] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [errorFiles, setErrorFiles] = useState<any>([]);

  const handleSubmit = async () => {
    let badFiles: any = [];
    images.forEach((image: any) => {
      const found = metadata.find((mtd: any) => mtd.name === image.name);
      if (!found) {
        badFiles = [...badFiles, image.name];
      }
    });
    setErrorFiles(badFiles);
    await uploadFiles("filecoin-ipfs", images);
  };

  console.log(errorFiles);

  return (
    <div>
      {errorFiles && (
        <>
          Files{" "}
          {errorFiles.map((file: any) => (
            <div>{file}</div>
          ))}{" "}
          do not have a corresponding json
        </>
      )}
      <Dropzone files={images} setFiles={setImages} />
      <JsonDropzone files={metadata} setFiles={setMetadata} />
      <button onClick={handleSubmit}>Click</button>
    </div>
  );
};

export default StepOne;
