import React, { useCallback, useMemo, useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { ReactComponent as CloudIcon } from "../../assets/icons/cloud.svg";
import DropzoneStyles from "../../styles/dropzone.module.css";
import FileBar from "../Misc/file-bar";

interface IProps {
  files: any[];
  setFiles: (files: any[]) => void;
  setBadFiles: (files: any[]) => void;
}

const ImageDropzone = ({ files, setFiles, setBadFiles }: IProps) => {
  const onDrop = useCallback(
    (
      acceptedFiles: Blob[] | MediaSource[],
      fileRejections: FileRejection[]
    ) => {
      setFiles(acceptedFiles);
      setBadFiles(fileRejections);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const baseStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "80px 140px 50px 140px",
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "rgba(255, 255, 255, 0.44)",
    borderStyle: "dashed",
    backgroundColor: "rgba(7, 17, 50, 0.56)",
    color: "#bdbdbd",
    transition: "border .3s ease-in-out",
    cursor: "pointer",
    marginTop: "2rem",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };
  console.log(files);

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

  useEffect(
    () => () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  console.log(files);
  const removeFile = (id: string) => {
    setFiles(files.filter((file: any) => file.name !== id));
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
            {files.map((file: any) => (
              <FileBar fileName={file.name} handleRemove={removeFile} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ImageDropzone;
