import React from "react";
import { ReactComponent as DeleteIcon } from "../../assets/icons/bin.svg";
import DropzoneStyle from "../../styles/dropzone.module.css";

interface IProps {
  fileName: string;
  handleRemove: (fileName: string) => void;
}

const FileBar = ({ fileName, handleRemove }: IProps) => {
  return (
    <div className={DropzoneStyle.filebar}>
      <div>{fileName}</div>
      <span role="presentation" onClick={() => handleRemove(fileName)}>
        <DeleteIcon />
      </span>
    </div>
  );
};

export default FileBar;
