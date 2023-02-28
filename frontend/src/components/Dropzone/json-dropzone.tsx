import React, { useCallback, useMemo } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { ReactComponent as FileIcon } from "../../assets/icons/file-icon.svg";
import {
  acceptStyle,
  activeStyle,
  baseStyle,
  rejectStyle,
} from "../../common/dropzone-style";
import FileBar from "../Misc/file-bar";
import DropzoneStyles from "../../styles/dropzone.module.css";

interface IProps {
  files: File[];
  setFiles: (files: File[]) => void;
  setBadFiles: (files: FileRejection[]) => void;
  uploadWarning: boolean;
}

const JsonDropzone = ({
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
    []
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
  });

  const otherAttr = { directory: "", webkitdirectory: "" };

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDragActive, isDragReject, isDragAccept]
  );

  const removeFile = (fileName: string) => {
    setFiles(files.filter((file: File) => file.name !== fileName));
  };

  const handleClear = () => {
    setFiles([]);
  };
  return (
    <>
      <div className={DropzoneStyles.container}>
        <h3>Metadata JSON Files</h3>
        <div
          className={DropzoneStyles.container__content__div}
          {...getRootProps()}
        >
          <input {...getInputProps()} {...otherAttr} />
          <div className={DropzoneStyles.container__content}>
            <FileIcon />
            <div className={DropzoneStyles.container__content__text}>
              <h3>
                <span className={DropzoneStyles.container__content__link}>
                  Click to select
                </span>{" "}
                corresponding JSON files
              </h3>
            </div>
          </div>
        </div>
        {files.length > 0 ? (
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
        ) : null}
      </div>
      {uploadWarning ? <span>Please upload JSON Files</span> : null}
    </>
  );
};

export default JsonDropzone;
