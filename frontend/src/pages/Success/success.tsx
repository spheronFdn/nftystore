import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ReactComponent as CongratulationsIcon } from "../../assets/icons/congratulations.svg";
import { IUploadMetadataResponse, IUploadResponse } from "../../common/types";
import FilledPrimaryButton from "../../components/Buttons/filled-primary";
import SuccessStyle from "../../styles/success.module.css";

const Success = () => {
  const navigate = useNavigate();
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protocol,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setProtocol,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    uploadResponse,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadataResponse,
  ] =
    useOutletContext<
      [string, (name: string) => void, IUploadResponse, IUploadMetadataResponse]
    >();

  useEffect(() => {
    if (metadataResponse.url === "") {
      navigate("/upload-nft/select-provider");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={SuccessStyle.container}>
      <CongratulationsIcon />
      <h1 className={SuccessStyle.title}>Congratulations</h1>
      <a href={metadataResponse.url}>{metadataResponse.url}</a>
      <div className="flex items-center justify-center button-container">
        <FilledPrimaryButton
          title={"Go to Home"}
          loading={false}
          disabled={false}
          handleClick={() => navigate("/nft-upload/select-provider")}
        />
      </div>
    </div>
  );
};

export default Success;
