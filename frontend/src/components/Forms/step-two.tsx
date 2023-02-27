import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { uploadFiles } from "../../api";
import FilledPrimaryButton from "../Buttons/filled-primary";
import Dropzone from "../Dropzone/image-dropzone";
import JsonDropzone from "../Dropzone/json-dropzone";
import { checkUploadFileValidity, listData } from "../../common/utils";
import { FileRejection } from "react-dropzone";
import { IUploadResponse } from "../../common/types";
import BadFiles from "../Misc/bad-files";
import HeroPrimaryButton from "../Buttons/hero-primary";
import Modal from "../Modal/modal";
import DropzoneStyle from "../../styles/dropzone.module.css";
import ModalStyle from "../../styles/modal.module.css";

const StepTwo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [badImages, setBadImages] = useState<FileRejection[]>([]);
  const [metadata, setMetadata] = useState<File[]>([]);
  const [badMetaData, setBadMetaData] = useState<FileRejection[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [protocol, setProtocol, uploadResponse, setUploadResponse] =
    useOutletContext<
      [
        string,
        (name: string) => void,
        string,
        (response: IUploadResponse) => void
      ]
    >();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (!params.get("protocol")) {
      navigate("/nft-upload/select-provider");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    let error = checkUploadFileValidity(images, metadata);
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      try {
        const response = await uploadFiles(params.get("protocol") || protocol, {
          images,
          metadata,
        });
        setUploadResponse(response);
        navigate(`/nft-upload/choose-url?protocol=${params.get("protocol")}`);
      } catch (error) {
        console.log("ERROR", error);
      }
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    navigate("/nft-upload/select-provider");
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 6000);
    }
  }, [error]);

  return (
    <>
      {modalOpen ? (
        <Modal
          setModalOpen={setModalOpen}
          modalHeading={"Guide"}
          modalContent={
            <ul>
              {listData.map((list) => (
                <li key={list.id} className={ModalStyle.modal__list}>
                  {list.description}
                </li>
              ))}
            </ul>
          }
        />
      ) : null}
      <div className={DropzoneStyle.drop__heading}>Drop your files here</div>
      <div className={DropzoneStyle.drop__subheading}>
        You can select all of your images in the NFT Collection along with the
        their corresponding JSON files in the Metadata JSON files.{" "}
        <span
          onClick={handleModalOpen}
          className={DropzoneStyle.container__content__link}
        >
          Learn More
        </span>
      </div>
      <div className={DropzoneStyle.content__container}>
        <div className={DropzoneStyle.image__container__margin}>
          <Dropzone
            files={images}
            setFiles={setImages}
            setBadFiles={setBadImages}
          />
        </div>
        <div className={DropzoneStyle.file__container__margin}>
          <JsonDropzone
            files={metadata}
            setFiles={setMetadata}
            setBadFiles={setBadMetaData}
          />
        </div>
        <div className={DropzoneStyle.errorFile}>
          <BadFiles badFiles={badImages} />
        </div>
        <div className={DropzoneStyle.errorFile}>
          <BadFiles badFiles={badMetaData} />
        </div>
      </div>
      <div className={DropzoneStyle.errorFile}>
        {error && (
          <div className={DropzoneStyle.errorFile__errorSpan}>
            <span className={DropzoneStyle.errorFile__errorBadge}>Error</span>
            {error}
          </div>
        )}
      </div>

      <div className={DropzoneStyle.drop__button__div}>
        <span style={{ marginRight: "1rem" }}>
          <HeroPrimaryButton
            title={"Previous"}
            loading={false}
            disabled={false}
            handleClick={handlePrevious}
          />
        </span>
        <FilledPrimaryButton
          title={"Upload And Next"}
          loading={loading}
          disabled={!metadata.length || !images.length || !!error}
          handleClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default StepTwo;
