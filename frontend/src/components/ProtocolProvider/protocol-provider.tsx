import React from "react";
import { ReactComponent as ArweaveIcon } from "../../assets/icons/arweave.svg";
import { ReactComponent as FilecoinIcon } from "../../assets/icons/filecoin.svg";
import { ReactComponent as IpfsIcon } from "../../assets/icons/ipfs.svg";
import ProtocolProviderStyle from "../../styles/protocol-provider.module.css";
import CardStyle from "../../styles/card.module.css";
import { Providers } from "../../common/utils";

interface IProps {
  selectedProtocol: string;
  setProtocol: (value: string) => void;
}

interface IProtocol {
  id: number;
  name: string;
  protocolName: string;
  description: string;
  icon: JSX.Element;
}

const ProtocolProvider = ({ selectedProtocol, setProtocol }: IProps) => {
  const isSelectedProtocol = (protocolName: string): boolean =>
    protocolName === selectedProtocol;

  const protocols: IProtocol[] = [
    {
      id: 1,
      name: "Arweave",
      protocolName: Providers.ARWEAVE,
      description:
        "Specializes in data storage, blockchain, and serverless web.",
      icon: <ArweaveIcon className="ProtocolProviderStyle.protocol__icon" />,
    },
    {
      id: 2,
      name: "Filecoin",
      protocolName: Providers.FILECOIN,
      description:
        "Specializes in data storage, blockchain, and serverless web.",
      icon: <FilecoinIcon className="ProtocolProviderStyle.protocol__icon" />,
    },
    {
      id: 3,
      name: "IPFS",
      protocolName: Providers.IPFS,
      description:
        "Specializes in data storage, blockchain, and serverless web.",
      icon: <IpfsIcon className="ProtocolProviderStyle.protocol__icon" />,
    },
  ];

  const handleProtocolClick = (protocol: string): void => {
    setProtocol(protocol);
  };

  return (
    <div className={`${CardStyle.protocol__provider__card__container}`}>
      {protocols.map((protocol) => (
        <div
          key={protocol.id}
          onClick={() => handleProtocolClick(protocol.protocolName)}
          className={`${
            isSelectedProtocol(protocol.protocolName) &&
            CardStyle.protocol__provider__card__selected
          } ${CardStyle.protocol__provider__card} ${
            protocol.id === 3 ? "" : CardStyle.protocol__card__margin
          }`}
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
