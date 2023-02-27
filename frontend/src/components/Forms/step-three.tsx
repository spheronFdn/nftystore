import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { uploadMetadata } from "../../api";
import { IUploadMetadataResponse, IUploadResponse } from "../../common/types";
import FilledPrimaryButton from "../Buttons/filled-primary";
import ContentUrlCard from "../Cards/content-url-card";
import DropzoneStyle from "../../styles/dropzone.module.css";
import Ipfs from "../../assets/icons/ipfs-icon.svg";
import Spheron from "../../assets/icons/spheron-icon.svg";
import HeroPrimaryButton from "../Buttons/hero-primary";

const StepThree = () => {
  const navigate = useNavigate();
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
      navigate("/success");
    } catch (error) {
      console.log("ERROR: ", error);
    }
    setLoading(false);
  };

  // **** Fix before merging

  useEffect(() => {
    if (!protocol || typeof uploadResponse === "undefined") {
      navigate("/nft-upload/select-provider");
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
      {/* proper style with classname */}
      <div className={DropzoneStyle.contentUrl__div}>
        <ContentUrlCard
          setSelectedUrl={setSelectedUrl}
          isFocused={true} // Set is true
          isActive={selectedUrl === uploadResponse.spheronUrl}
          contentProvider={"Spheron"}
          link={uploadResponse.spheronUrl}
          image={Spheron}
        />
        <div className={DropzoneStyle.contentUrl__margin}>
          <ContentUrlCard
            setSelectedUrl={setSelectedUrl}
            isFocused={false}
            isActive={selectedUrl === uploadResponse.baseUrl}
            contentProvider={protocol}
            link={uploadResponse.baseUrl}
            image={Ipfs} // take from backend
          />
        </div>
      </div>
      <div className={DropzoneStyle.stepThree__button__div}>
        <span style={{ marginRight: "1rem" }}>
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
