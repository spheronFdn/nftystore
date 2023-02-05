import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { uploadFiles } from "../../api";
import FilledPrimaryButton from "../Buttons/filled-primary";
import DropzoneStyle from "../../styles/dropzone.module.css";
import Dropzone from "../Dropzone/image-dropzone";
import JsonDropzone from "../Dropzone/json-dropzone";
import { checkUploadFileValidity } from "../../common/utils";
import { FileRejection } from "react-dropzone";
import { IUploadResponse } from "../../common/types";
import BadFiles from "../Misc/bad-files";

const StepTwo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [badImages, setBadImages] = useState<FileRejection[]>([]);
  const [metadata, setMetadata] = useState<File[]>([]);
  const [badMetaData, setBadMetaData] = useState<FileRejection[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [protocol, setProtocol, uploadResponse, setUploadResponse] =
    useOutletContext<
      [
        string,
        (name: string) => void,
        string,
        (response: IUploadResponse) => void
      ]
    >();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (!params.get("protocol")) {
      navigate("/nft-upload/select-provider");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    let error = checkUploadFileValidity(images, metadata);
    if (error) {
      setError(error);
      navigate(`/nft-upload/choose-url?protocol=${params.get("protocol")}`);
      setLoading(false);
    } else {
      try {
        const response = await uploadFiles(params.get("protocol") || protocol, {
          images,
          metadata,
        });
        setUploadResponse(response);
        navigate(`/nft-upload/choose-url?protocol=${params.get("protocol")}`);
      } catch (error) {
        console.log("ERROR", error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 2000);
    }
  }, [error]);

  return (
    <>
      <h1>Drop your files</h1>
      <div className={DropzoneStyle.errorFile}> {error && <>{error}</>}</div>
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
          <BadFiles badFiles={badImages} />
        </div>
        <div className={DropzoneStyle.errorFile}>
          <BadFiles badFiles={badMetaData} />
        </div>
      </div>
      <div className="flex items-center justify-center button-container">
        <FilledPrimaryButton
          title={"Upload"}
          loading={loading}
          disabled={!metadata.length || !images.length || !!error}
          handleClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default StepTwo;
