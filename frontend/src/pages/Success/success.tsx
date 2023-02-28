import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ReactComponent as Confetti } from "../../assets/icons/confetti.svg";
import { ReactComponent as Copy } from "../../assets/icons/copy-icon.svg";
import { ReactComponent as Link } from "../../assets/icons/link.svg";

import { IUploadMetadataResponse, IUploadResponse } from "../../common/types";
import FilledPrimaryButton from "../../components/Buttons/filled-primary";
import SuccessStyle from "../../styles/success.module.css";

const Success = () => {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState<boolean>(false);
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
    if (metadataResponse?.url === "") {
      navigate("/upload-nft/select-provider");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={SuccessStyle.container}>
      <Confetti />
      <h1 className={SuccessStyle.title}>Congrats, Collection is Ready!</h1>
      <span className={SuccessStyle.subtitle}>
        Here is your generated{" "}
        <span className={SuccessStyle.subtitle__span}> Token URI</span> that you
        can use to launch your collection using ERC721 Contract.
        <br /> Just set your{" "}
        <span className={SuccessStyle.subtitle__span}>Base URI</span> with this
        and you can view all the collection in the marketplace
      </span>
      <div className={SuccessStyle.successUrl}>
        <Link style={{ stroke: "#56A1FF" }} />
        <a href={metadataResponse?.url} rel="noreferrer" target="_blank">
          {metadataResponse?.url}
        </a>

        <div className={SuccessStyle.copy__div}>
          <Copy
            onClick={() => {
              navigator.clipboard.writeText(metadataResponse?.url);
              setIsCopied(true);
            }}
            className={SuccessStyle.copy__icon}
          />
          <div
            className={`${SuccessStyle.copy__tooltip} ${
              isCopied
                ? SuccessStyle.copied__tooltip__color
                : SuccessStyle.copy__tooltip__color
            }`}
          >
            {isCopied ? "Link Copied" : "Copy Link"}
          </div>
        </div>
      </div>
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
