import React, { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { ReactComponent as ImageIcon } from "../../assets/icons/image-icon.svg";
import FileBar from "../Misc/file-bar";
import DropzoneStyles from "../../styles/dropzone.module.css";

interface IProps {
  files: File[];
  setFiles: (files: File[]) => void;
  setBadFiles: (files: FileRejection[]) => void;
  uploadWarning: boolean;
}

const ImageDropzone = ({
  files,
  setFiles,
  setBadFiles,
  uploadWarning,
}: IProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setFiles(acceptedFiles);
      setBadFiles(fileRejections);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const otherAttr = { directory: "", webkitdirectory: "" };

  const removeFile = (id: string) => {
    setFiles(files.filter((file: File) => file.name !== id));
  };

  const handleClear = () => {
    setFiles([]);
  };

  return (
    <>
      <div className={DropzoneStyles.container}>
        <h3>NFT collection</h3>
        <div
          className={DropzoneStyles.container__content__div}
          {...getRootProps()}
        >
          <div className={DropzoneStyles.container__content}>
            <input {...getInputProps()} {...otherAttr} />
            <ImageIcon />
            <div className={DropzoneStyles.container__content__text}>
              <span className={DropzoneStyles.container__content__link}>
                Click to select
              </span>{" "}
              NFT collection
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div className={DropzoneStyles.filebar__container}>
            <div className={DropzoneStyles.filebar__title__div}>
              <span className={DropzoneStyles.filebar__title__files}>
                Total Files:{" "}
                <span className={DropzoneStyles.filebar__files__length}>
                  {files.length}
                </span>
              </span>
              <span
                onClick={handleClear}
                className={DropzoneStyles.filebar__title__clear}
              >
                Clear All
              </span>
            </div>
            {files.map((file: File) => (
              <FileBar
                key={file.name}
                fileName={file.name}
                handleRemove={removeFile}
              />
            ))}
          </div>
        )}
      </div>
      {uploadWarning && <span>Please upload images</span>}
    </>
  );
};

export default ImageDropzone;
