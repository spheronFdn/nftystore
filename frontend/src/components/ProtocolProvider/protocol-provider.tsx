import React from "react";
import { ReactComponent as ArweaveIcon } from "../../assets/icons/arweave.svg";
import { ReactComponent as FilecoinIcon } from "../../assets/icons/filecoin.svg";
import ProtocolProviderStyles from "../../styles/protocol-provider.module.css";

interface IProps {
  selectedProtocol: string;
  setProtocol: (value: string) => void;
}

const ProtocolProvider = ({ selectedProtocol, setProtocol }: IProps) => {
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
  return (
    <div className="flex justify-center items-center">
      {protocols.map((protocol) => (
        <div
          key={protocol.id}
          onClick={() => setProtocol(protocol.name)}
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
