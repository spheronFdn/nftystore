import React from "react";
import { ReactComponent as CloseCircle } from "../../assets/icons/close-circle.svg";
import DropzoneStyle from "../../styles/dropzone.module.css";

interface IProps {
  fileName: string;
  handleRemove: (fileName: string) => void;
}

const FileBar = ({ fileName, handleRemove }: IProps) => {
  return (
    <>
      <div className={DropzoneStyle.filebar}>
        <div>{fileName}</div>
        <span role="presentation" onClick={() => handleRemove(fileName)}>
          <CloseCircle className={DropzoneStyle.filebar__delete__icon} />
        </span>
      </div>
    </>
  );
};

export default FileBar;
