import React, { useCallback, useMemo, useEffect, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import DropzoneStyles from "../../styles/dropzone.module.css";

interface IProps {
  files: Blob[] | MediaSource[];
  setFiles: any;
}

const Dropzone = ({ files, setFiles }: IProps) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(
      acceptedFiles.map((file: Blob | MediaSource) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const baseStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
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
    acceptedFiles,
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

  const thumbs = acceptedFiles.map((file: any) => (
    <div key={file.name}>
      <img src={file.preview} alt={file.name} />
    </div>
  ));
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

  return (
    <>
      <div className={DropzoneStyles.container} {...getRootProps({ style })}>
        <input {...getInputProps()} {...otherAttr} />
        <PlusIcon
          className={DropzoneStyles.plus__icon}
          height={100}
          width={100}
        />
      </div>
      <div className={DropzoneStyles.thumb__container}>{thumbs}</div>
    </>
  );
};

export default Dropzone;
