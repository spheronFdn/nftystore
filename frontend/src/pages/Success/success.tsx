import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ReactComponent as Confetti } from "../../assets/icons/confetti.svg";
import { ReactComponent as Copy } from "../../assets/icons/copy-icon.svg";
import { ReactComponent as Link } from "../../assets/icons/link.svg";
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
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isImage, setIsImage] = useState<string>("");
  // const [
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   protocol,
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   setProtocol,
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   uploadResponse,
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   setUploadResponse,
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   metadataResponse,
  // ] =
  //   useOutletContext<
  //     [
  //       string,
  //       (name: string) => void,
  //       IUploadResponse,
  //       (response: IUploadResponse) => void,
  //       IUploadMetadataResponse
  //     ]
  //   >();

  useEffect(() => {
    // if (metadataResponse?.spheronUrl === "") {
    //   navigate("/upload-nft/select-provider");
    // }
    // switch (protocol) {
    //   case Providers.ARWEAVE:
    //     return setIsImage(Arweave);
    //   case Providers.FILECOIN:
    //     return setIsImage(Filecoin);
    //   case Providers.IPFS:
    //     return setIsImage(Ipfs);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSpheronCopy = () => {
    navigator.clipboard.writeText(metadataResponse?.spheronUrl);
    setIsCopied(true);
  };

  const handleProtocolCopy = () => {
    navigator.clipboard.writeText(metadataResponse?.url);
    setIsCopied(true);
  };
  // console.log(protocol, "protocol");

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
            {/* <a href={`https://${link.link}`} rel="noreferrer" target="_blank">
              {`https://${link.link}`}
            </a> */}
            <a href="#" rel="noreferrer" target="_blank">
              hy
            </a>
            <div onClick={link.linkCopy} className={SuccessStyle.copy__div}>
              <span className={SuccessStyle.copy__span}>Copy</span>
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
