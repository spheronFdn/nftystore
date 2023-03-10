import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { uploadFiles } from "../../api";
import FilledPrimaryButton from "../Buttons/filled-primary";
import Dropzone from "../Dropzone/file-dropzone";
import { checkUploadFileValidity, FileType } from "../../common/utils";
import { FileRejection } from "react-dropzone";
import { IUploadResponse } from "../../common/types";
import BadFiles from "../Misc/bad-files";
import HeroPrimaryButton from "../Buttons/hero-primary";
import Modal from "../Modal/modal";
import Input from "../Input/input";
import DropzoneStyle from "../../styles/dropzone.module.css";

const UploadFiles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [badImages, setBadImages] = useState<FileRejection[]>([]);
  const [metadata, setMetadata] = useState<File[]>([]);
  const [badMetaData, setBadMetaData] = useState<FileRejection[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [uploadWarning, setUploadWarning] = useState<boolean>(false);
  const [collectionName, setCollectionName] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
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
        const response = await uploadFiles(
          params.get("protocol") || protocol,
          collectionName,
          accessToken,
          {
            images,
            metadata,
          }
        );
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

  useEffect(() => {
    if (
      (images.length < 0 && metadata.length > 0) ||
      (images.length > 0 && metadata.length < 0)
    ) {
      setUploadWarning(true);
    }
  }, [images, metadata]);

  return (
    <>
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} modalHeading={"Guide"} />
      )}
      <Input
        heading={"Collection Name"}
        placeholder={"e.g. Bored Ape Yacht Club"}
        inputValue={collectionName}
        setInputValue={setCollectionName}
      />
      <Input
        heading={"Access Token"}
        placeholder={"Enter your access token"}
        description={
          "Please create an access token from Spheron platform to upload and manage the bandwidth billing."
        }
        descriptionLink="https://docs.spheron.network/api/rest-api-references/#creating-an-access-token"
        descriptionLinkText="Learn More"
        inputValue={accessToken}
        setInputValue={setAccessToken}
      />
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
            uploadWarning={uploadWarning}
            title={"NFT collection"}
            description={"NFT collection"}
            fileType={FileType.IMAGES}
          />
        </div>
        <div className={DropzoneStyle.file__container__margin}>
          <Dropzone
            files={metadata}
            setFiles={setMetadata}
            setBadFiles={setBadMetaData}
            uploadWarning={uploadWarning}
            title={"Metadata JSON Files"}
            description={"corresponding JSON files"}
            fileType={FileType.METADATA}
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
        <span className={DropzoneStyle.previous__button__div}>
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
          disabled={
            !metadata.length ||
            !images.length ||
            !!error ||
            !collectionName.length ||
            !accessToken.length
          }
          handleClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default UploadFiles;
