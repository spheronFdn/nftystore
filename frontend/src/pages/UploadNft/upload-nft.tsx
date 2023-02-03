import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import StepNav from "../../components/Navigation/step-nav";
import UploadNftStyle from "../../styles/uploadnft.module.css";

const UploadNft = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<any>(1);
  const [protocol, setProtocol] = useState<any>("");
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    setCurrentStep(Number(location.pathname.split("/")[2]));
  }, [location.pathname]);

  useEffect(() => {
    setProtocol(query.get("protocol"));
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
      <Outlet context={[protocol, setProtocol]} />
    </div>
  );
};

export default UploadNft;
