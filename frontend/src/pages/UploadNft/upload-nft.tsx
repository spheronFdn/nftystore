import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IUploadResponse } from "../../common/types";
import StepNav from "../../components/Navigation/step-nav";
import UploadNftStyle from "../../styles/uploadnft.module.css";

const UploadNft = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadResponse, setUploadResponse] = useState<IUploadResponse>();
  const [protocol, setProtocol] = useState<string>("");
  const query: URLSearchParams = new URLSearchParams(location.search);

  useEffect(() => {
    setCurrentStep(Number(location.pathname.split("/")[2]));
  }, [location.pathname]);

  useEffect(() => {
    setProtocol(query.get("protocol") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentStep) {
    navigate("/nft-upload/1");
  }

  return (
    <div className={UploadNftStyle.container}>
      <div>
        <StepNav currentStep={currentStep} />
      </div>
      <Outlet
        context={[protocol, setProtocol, uploadResponse, setUploadResponse]}
      />
    </div>
  );
};

export default UploadNft;
