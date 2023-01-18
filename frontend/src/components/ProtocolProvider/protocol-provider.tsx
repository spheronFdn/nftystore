import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArweaveIcon } from "../../assets/icons/arweave.svg";
import { ReactComponent as FilecoinIcon } from "../../assets/icons/filecoin.svg";
import ProtocolProviderStyles from "../../styles/protocol-provider.module.css";

interface IProps {
  selectedProtocol: string;
  setProtocol: (value: string) => void;
}

const ProtocolProvider = ({ selectedProtocol, setProtocol }: IProps) => {
  const navigate = useNavigate();

  const protocols = [
    {
      id: 1,
      name: "arweave",
      icon: <ArweaveIcon className={ProtocolProviderStyles.protocol__icon} />,
    },
    {
      id: 2,
      name: "filecoin",
      icon: <FilecoinIcon className={ProtocolProviderStyles.protocol__icon} />,
    },
  ];

  const handleProtocolClick = (protocol: string): void => {
    setProtocol(protocol);
    navigate(`/nft-upload/2?protocol=${protocol}`);
  };

  return (
    <div className="flex justify-center items-center">
      {protocols.map((protocol) => (
        <div
          key={protocol.id}
          onClick={() => handleProtocolClick(protocol.name)}
          className={`${ProtocolProviderStyles.protocol__button} ${
            selectedProtocol === protocol.name &&
            ProtocolProviderStyles.protocol__button__selected
          }`}
        >
          <span className="capitalize">{protocol.name}</span>
          {protocol.icon}
        </div>
      ))}
    </div>
  );
};

export default ProtocolProvider;
