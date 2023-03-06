import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IUploadMetadataResponse, IUploadResponse } from "../../common/types";
import { getStepNumber } from "../../common/utils";
import StepNav from "../../components/Navigation/step-nav";
import UploadNftStyle from "../../styles/uploadnft.module.css";

const UploadNft = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadResponse, setUploadResponse] = useState<IUploadResponse>({
    uploadId: "",
    fileNames: [],
    baseUrl: "",
    spheronUrl: "",
  });
  const [metadataResponse, setMetadataResponse] =
    useState<IUploadMetadataResponse>({
      spheronUrl: "",
      uploadId: "",
      url: "",
    });
  const [protocol, setProtocol] = useState<string>("");
  const query: URLSearchParams = new URLSearchParams(location.search);

  useEffect(() => {
    setCurrentStep(getStepNumber(location.pathname.split("/")[2]));
  }, [location.pathname]);

  useEffect(() => {
    setProtocol(query.get("protocol") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentStep || (currentStep > 2 && !uploadResponse)) {
    navigate("/nft-upload/select-provider");
  }

  return (
    <div className={UploadNftStyle.container}>
      {currentStep <= 3 && (
        <div>
          <StepNav currentStep={currentStep} />
        </div>
      )}
      <Outlet
        context={[
          protocol,
          setProtocol,
          uploadResponse,
          setUploadResponse,
          metadataResponse,
          setMetadataResponse,
        ]}
      />
    </div>
  );
};

export default UploadNft;
