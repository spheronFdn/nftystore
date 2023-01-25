import React, { useCallback, useMemo, useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { ReactComponent as CloudIcon } from "../../assets/icons/cloud.svg";
import DropzoneStyles from "../../styles/dropzone.module.css";
import FileBar from "../Misc/file-bar";

interface IProps {
  files: any;
  setFiles: any;
  setBadFiles: (files: any[]) => void;
}

const JsonDropzone = ({ files, setFiles, setBadFiles }: IProps) => {
  const onDrop = useCallback(
    (
      acceptedFiles: Blob[] | MediaSource[],
      fileRejections: FileRejection[]
    ) => {
      acceptedFiles.forEach((file: any) => {
        console.log("FF: ", file);
        const reader = new FileReader();
        reader.onload = () => {
          setFiles((prevState: any) => [
            ...prevState,
            { name: file.name, data: reader.result },
          ]);
        };
        reader.readAsText(file);
      });
      setBadFiles(fileRejections);

      // setFiles(
      //   acceptedFiles.map((file: Blob | MediaSource) =>
      //     Object.assign(file, {
      //       preview: URL.createObjectURL(file),
      //     })
      //   )
      // );
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(
    () => () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const removeFile = (fileName: string) => {
    setFiles(files.filter((file: any) => file.name !== fileName));
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
                <div>
                  Please upload in .json format with image associated <br />
                </div>
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

export default JsonDropzone;
