import React, { useCallback, useMemo } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { ReactComponent as CloudIcon } from "../../assets/icons/cloud.svg";
import {
  acceptStyle,
  activeStyle,
  baseStyle,
  rejectStyle,
} from "../../common/dropzone-style";
import DropzoneStyles from "../../styles/dropzone.module.css";
import FileBar from "../Misc/file-bar";

interface IProps {
  files: File[];
  setFiles: (files: File[]) => void;
  setBadFiles: (files: FileRejection[]) => void;
}

const ImageDropzone = ({ files, setFiles, setBadFiles }: IProps) => {
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
      "image/jpeg": [],
      "image/png": [],
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

  const removeFile = (id: string) => {
    setFiles(files.filter((file: File) => file.name !== id));
  };

  return (
    <>
      <div className={DropzoneStyles.container} {...getRootProps({ style })}>
        {files.length === 0 ? (
          <>
            <input {...getInputProps()} {...otherAttr} />
            <div className={DropzoneStyles.container__content}>
              <CloudIcon />
              <div className={DropzoneStyles.container__content__text}>
                <h3>
                  Drag & drop your files or <span>Browse</span>
                </h3>
                <div>Please upload in .png/.jpeg/.jpg format</div>
              </div>
            </div>
          </>
        ) : (
          <div className={DropzoneStyles.filebar__container}>
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
    </>
  );
};

export default ImageDropzone;
