import React from "react";
import { FileRejection } from "react-dropzone";

interface IProps {
  badFiles: FileRejection[];
}

const BadFiles = ({ badFiles }: IProps) => {
  return (
    <>
      {badFiles.map((file: FileRejection) => (
        <span key={file.file.name}>{file.file.name}</span>
      ))}{" "}
      {badFiles.length > 0 && <>not accepted</>};
    </>
  );
};

export default BadFiles;
