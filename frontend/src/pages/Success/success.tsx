import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ReactComponent as Confetti } from "../../assets/icons/confetti.svg";
import Ipfs from "../../assets/icons/ipfs-icon.svg";
import Arweave from "../../assets/icons/arweave-circle.svg";
import Filecoin from "../../assets/icons/filecoin-circle.svg";
import Spheron from "../../assets/icons/spheron-icon.svg";
import { IUploadMetadataResponse, IUploadResponse } from "../../common/types";
import { Providers } from "../../common/utils";
import FilledPrimaryButton from "../../components/Buttons/filled-primary";
import SuccessStyle from "../../styles/success.module.css";

const Success = () => {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState<Array<any>>([]);
  const [isImage, setIsImage] = useState<string>("");
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protocol,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setProtocol,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    uploadResponse,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUploadResponse,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadataResponse,
  ] =
    useOutletContext<
      [
        string,
        (name: string) => void,
        IUploadResponse,
        (response: IUploadResponse) => void,
        IUploadMetadataResponse
      ]
    >();

  useEffect(() => {
    if (metadataResponse?.spheronUrl === "") {
      navigate("/upload-nft/select-provider");
    }
    switch (protocol) {
      case Providers.ARWEAVE:
        setIsImage(Arweave);
        break;
      case Providers.FILECOIN:
        setIsImage(Filecoin);
        break;
      case Providers.IPFS:
        setIsImage(Ipfs);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let copiedText = [...isCopied];
  const handleSpheronCopy = (i: number) => {
    navigator.clipboard.writeText(metadataResponse?.spheronUrl);
    copiedText[i] = true;
    setIsCopied(copiedText);
  };

  const handleProtocolCopy = (i: number) => {
    navigator.clipboard.writeText(metadataResponse?.url);
    copiedText[i] = true;
    setIsCopied(copiedText);
  };

  const links = [
    {
      id: 1,
      link: metadataResponse?.spheronUrl,
      icon: Spheron,
      linkCopy: handleSpheronCopy,
    },
    {
      id: 2,
      link: metadataResponse?.url,
      icon: isImage,
      linkCopy: handleProtocolCopy,
    },
  ];

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
      <div className={SuccessStyle.successUrl__div}>
        {links.map((link) => (
          <div
            className={`${
              link.id === 2 ? SuccessStyle.successUrl__margin : ""
            } ${SuccessStyle.successUrl}`}
          >
            <img className={SuccessStyle.link__icon} src={link.icon} />
            <div className={SuccessStyle.link__div}>
              <a href={`https://${link.link}`} rel="noreferrer" target="_blank">
                {`https://${link.link}`}
              </a>
            </div>
            <div
              onClick={() => link.linkCopy(link.id)}
              className={SuccessStyle.copy__div}
            >
              <span className={SuccessStyle.copy__span}>Copy</span>
              <span
                className={`${SuccessStyle.copy__tooltip} ${
                  isCopied[link.id]
                    ? SuccessStyle.copied__tooltip__color
                    : SuccessStyle.copy__tooltip__color
                }`}
              >
                {isCopied[link.id] ? "Link Copied" : "Copy Link"}
              </span>
            </div>
          </div>
        ))}
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
