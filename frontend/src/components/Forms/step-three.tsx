import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { uploadMetadata } from "../../api";
import { IUploadResponse } from "../../common/types";
import FilledPrimaryButton from "../Buttons/filled-primary";
import ContentUrlCard from "../Cards/content-url-card";

const StepThree = () => {
  const navigate = useNavigate();
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [protocol, setProtocol, uploadResponse, setUploadResponse] =
    useOutletContext<
      [
        string,
        (name: string) => void,
        IUploadResponse,
        (response: IUploadResponse) => void
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
      navigate("/success");
    } catch (error) {
      console.log("ERROR: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!protocol || typeof uploadResponse === "undefined") {
      navigate("/nft-upload/select-provider");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Select Content URL</h1>
      <div className="grid grid-cols-1 gap-4 justify-items-center">
        <ContentUrlCard
          setSelectedUrl={setSelectedUrl}
          isFocused={true}
          isActive={selectedUrl === uploadResponse.spheronUrl}
          contentProvider={"Spheron"}
          link={uploadResponse.spheronUrl}
        />
        <ContentUrlCard
          setSelectedUrl={setSelectedUrl}
          isFocused={false}
          isActive={selectedUrl === uploadResponse.baseUrl}
          contentProvider={protocol}
          link={uploadResponse.baseUrl}
        />
      </div>
      <div className="flex items-center justify-center button-container">
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
