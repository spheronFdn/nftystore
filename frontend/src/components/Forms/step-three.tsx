import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { uploadMetadata } from "../../api";
import { IUploadMetadataResponse, IUploadResponse } from "../../common/types";
import FilledPrimaryButton from "../Buttons/filled-primary";
import HeroPrimaryButton from "../Buttons/hero-primary";
import ContentUrlCard from "../Cards/content-url-card";
import Ipfs from "../../assets/icons/ipfs-icon.svg";
import Arweave from "../../assets/icons/arweave-circle.svg";
import Filecoin from "../../assets/icons/filecoin-circle.svg";
import Spheron from "../../assets/icons/spheron-icon.svg";
import { FocusedProvider, Providers } from "../../common/utils";
import DropzoneStyle from "../../styles/dropzone.module.css";

const StepThree = () => {
  const navigate = useNavigate();
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [focusedValue, setFocusedValue] = useState<FocusedProvider>(
    FocusedProvider.SPHERON
  );
  const [isImage, setIsImage] = useState<string>("");
  const [
    protocol,
    setProtocol,
    uploadResponse,
    setUploadResponse,
    metadataResponse,
    setMetadataResponse,
  ] =
    useOutletContext<
      [
        string,
        (name: string) => void,
        IUploadResponse,
        (response: IUploadResponse) => void,
        IUploadMetadataResponse,
        (response: IUploadMetadataResponse) => void
      ]
    >();

  const handleNext = async () => {
    setLoading(true);
    try {
      const response = await uploadMetadata(
        protocol,
        uploadResponse.uploadId,
        uploadResponse.fileNames,
        selectedUrl
      );
      setMetadataResponse(response);
      navigate("/nft-upload/success");
    } catch (error) {
      console.log("ERROR: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!protocol || typeof uploadResponse === "undefined") {
      navigate("/nft-upload/select-provider");
    }
    switch (protocol) {
      case Providers.ARWEAVE:
        return setIsImage(Arweave);
      case Providers.FILECOIN:
        return setIsImage(Filecoin);
      case Providers.IPFS:
        return setIsImage(Ipfs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrevious = () => {
    navigate(`/nft-upload/upload-files?protocol=${protocol}`);
  };
  return (
    <>
      <div className={DropzoneStyle.drop__heading}>
        Select Collection Base URI
      </div>
      <div className={DropzoneStyle.drop__subheading}>
        Please select the desired gateway to access your collection base URI. We
        recommend using Spheron Gateway as it is super-charged with edge CDN.
      </div>
      <div className={DropzoneStyle.contentUrl__div}>
        <ContentUrlCard
          setSelectedUrl={setSelectedUrl}
          focusedValue={focusedValue}
          setFocusedValue={setFocusedValue}
          contentProvider={"Spheron"}
          link={uploadResponse.spheronUrl}
          image={Spheron}
          cardValue={FocusedProvider.SPHERON}
        />
        <div className={DropzoneStyle.contentUrl__margin}>
          <ContentUrlCard
            setSelectedUrl={setSelectedUrl}
            focusedValue={focusedValue}
            setFocusedValue={setFocusedValue}
            contentProvider={protocol}
            link={uploadResponse.baseUrl}
            image={isImage}
            cardValue={FocusedProvider.PROVIDER}
          />
        </div>
      </div>
      <div className={DropzoneStyle.stepThree__button__div}>
        <span className={DropzoneStyle.previous__button__div}>
          <HeroPrimaryButton
            title={"Previous"}
            loading={false}
            disabled={false}
            handleClick={handlePrevious}
          />
        </span>
        <FilledPrimaryButton
          title={"Proceed"}
          loading={loading}
          disabled={!Boolean(selectedUrl) || loading}
          handleClick={handleNext}
        />
      </div>
    </>
  );
};

export default StepThree;
