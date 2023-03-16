import React, { useCallback } from "react";
import { ReactComponent as ImageIcon } from "../../assets/icons/image-icon.svg";
import FileBar from "../Misc/file-bar";
import { FileType } from "../../common/utils";
import DropzoneStyles from "../../styles/dropzone.module.css";

interface IProps {
  inputId: string;
  files: File[];
  setFiles: (files: File[]) => void;
  uploadWarning: boolean;
  title: string;
  description: string;
  fileType: string;
}

const ImageDropzone = ({
  inputId,
  files,
  setFiles,
  uploadWarning,
  title,
  description,
  fileType,
}: IProps) => {
  // Normal e type = `React.ChangeEvent<HTMLInputElement>` is showing error. So infer better type from usage.
  const handleFileChange = (e: any) => {
    if (e.target.files?.length > 0) {
      setFiles([...files, ...e.target.files]);
    }
  };

  const fileConvertorNumber = fileType === FileType.IMAGES ? 1024 * 1024 : 1024;

  const removeFile = (id: string) => {
    setFiles(files.filter((file: File) => file.name !== id));
  };

  const handleClear = () => {
    setFiles([]);
  };
  const filesSize = files.map((file) =>
    Number((file.size / fileConvertorNumber).toFixed(2))
  );

  const sum = filesSize.reduce(
    (partialSum: number, a: number) => (partialSum += a),
    0
  );

  return (
    <>
      <div className={DropzoneStyles.container}>
        <h3 className={DropzoneStyles.heading}>{title}</h3>
        <label
          htmlFor={inputId}
          className={DropzoneStyles.container__content__div}
        >
          <div className={DropzoneStyles.container__content}>
            <ImageIcon />
            <div className={DropzoneStyles.container__content__text}>
              <span className={DropzoneStyles.container__content__link}>
                Click to select
              </span>{" "}
              {description}
            </div>
          </div>
        </label>
        <input
          id={inputId}
          accept={
            fileType === FileType.IMAGES
              ? `image/jpeg,image/png,image/jpg`
              : `application/JSON`
          }
          type="file"
          multiple
          onChange={(e) => handleFileChange(e)}
          style={{ display: "none" }}
        />
        {files.length > 0 && (
          <div className={DropzoneStyles.filebar__container}>
            <div className={DropzoneStyles.filebar__title__div}>
              <span className={DropzoneStyles.filebar__title__files}>
                Total Files:{" "}
                <span className={DropzoneStyles.filebar__files__length}>
                  {files.length} files ({sum.toFixed(2)}
                  {fileType === FileType.IMAGES ? <>mb</> : <>kb</>})
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

      {uploadWarning && (
        <>
          {fileType === FileType.IMAGES ? (
            <span className={DropzoneStyles.heading}>Please upload Images</span>
          ) : (
            <span className={DropzoneStyles.heading}>
              Please select some files
            </span>
          )}
        </>
      )}
    </>
  );
};

export default ImageDropzone;
