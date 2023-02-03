import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadFiles } from "../../api";
import FilledPrimaryButton from "../Buttons/filled-primary";
import DropzoneStyle from "../../styles/dropzone.module.css";
import Dropzone from "../Dropzone/image-dropzone";
import JsonDropzone from "../Dropzone/json-dropzone";

const StepTwo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);
  const [badImages, setBadImages] = useState<any>([]);
  const [metadata, setMetadata] = useState([]);
  const [badMetaData, setBadMetaData] = useState<any>([]);
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (!params.get("protocol")) {
      navigate("/nft-upload/1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    await uploadFiles(params.get("protocol") || "", { images, metadata });
    navigate(`/nft-upload/3?protocol=${params.get("protocol")}`);
  };
  // const handleSubmit = async () => {
  //   let badFiles: any = [];
  //   images.forEach((image: any) => {
  //     const found = metadata.find((mtd: any) => mtd.name === image.name);
  //     if (!found) {
  //       badFiles = [...badFiles, image.name];
  //     }
  //   });
  //   setErrorFiles(badFiles);
  //   await uploadFiles("ipfs-filecoin", images);
  // };

  return (
    <>
      <h1>Drop your files</h1>
      <div className="grid grid-cols-2">
        <div>
          <Dropzone
            files={images}
            setFiles={setImages}
            setBadFiles={setBadImages}
          />
        </div>
        <div>
          <JsonDropzone
            files={metadata}
            setFiles={setMetadata}
            setBadFiles={setBadMetaData}
          />
        </div>
        <div className={DropzoneStyle.errorFile}>
          {badImages.map((file: any) => (
            <span>{file.file.name}</span>
          ))}{" "}
          {badImages.length > 0 && <>not accepted</>}
        </div>
        <div className={DropzoneStyle.errorFile}>
          {badMetaData.map((file: any) => (
            <span>{file.file.name}</span>
          ))}{" "}
          {badMetaData.length > 0 && <>not accepted</>}
        </div>
      </div>
      <div className="flex items-center justify-center button-container">
        <FilledPrimaryButton
          title={"Upload"}
          loading={false}
          disabled={!metadata.length || !images.length}
          handleClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default StepTwo;
