import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArweaveIcon } from "../../assets/icons/arweave.svg";
import { ReactComponent as FilecoinIcon } from "../../assets/icons/filecoin.svg";
import ProtocolProviderStyle from "../../styles/protocol-provider.module.css";
import CardStyle from "../../styles/card.module.css";

interface IProps {
  selectedProtocol: string;
  setProtocol: (value: string) => void;
}

interface IProtocol {
  id: number;
  name: string;
  description: string;
  icon: JSX.Element;
}

const ProtocolProvider = ({ selectedProtocol, setProtocol }: IProps) => {
  const navigate = useNavigate();

  const isSelectedProtocol = (protocolName: string): boolean =>
    protocolName === selectedProtocol;

  const protocols: IProtocol[] = [
    {
      id: 1,
      name: "arweave",
      description:
        "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
      icon: (
        <ArweaveIcon
          className={`${
            isSelectedProtocol("arweave") &&
            ProtocolProviderStyle.protocol__icon__selected
          } ${ProtocolProviderStyle.protocol__icon}`}
        />
      ),
    },
    {
      id: 2,
      name: "filecoin",
      description:
        "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
      icon: (
        <FilecoinIcon
          className={`${
            isSelectedProtocol("filecoin") &&
            ProtocolProviderStyle.protocol__icon__selected
          } ${ProtocolProviderStyle.protocol__icon}`}
        />
      ),
    },
    {
      id: 3,
      name: "ipfs",
      description:
        "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
      icon: (
        <FilecoinIcon
          className={`${
            isSelectedProtocol("ipfs") &&
            ProtocolProviderStyle.protocol__icon__selected
          } ${ProtocolProviderStyle.protocol__icon}`}
        />
      ),
    },
  ];

  const handleProtocolClick = (protocol: string): void => {
    setProtocol(protocol);
    // navigate(`/nft-upload/2?protocol=${protocol}`);
  };

  return (
    <div
      className={`grid grid-cols-3 ${CardStyle.protocol__provider__card__container}`}
    >
      {protocols.map((protocol) => (
        <div
          key={protocol.id}
          onClick={() => handleProtocolClick(protocol.name)}
          className={`${
            isSelectedProtocol(protocol.name) &&
            CardStyle.protocol__provider__card__selected
          } ${CardStyle.protocol__provider__card}`}
        >
          <div>{protocol.icon}</div>
          <h3>{protocol.name}</h3>
          <p>{protocol.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProtocolProvider;
