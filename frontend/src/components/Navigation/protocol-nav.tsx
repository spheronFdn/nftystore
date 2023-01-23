import React from "react";
import { ReactComponent as BackIcon } from "../../assets/icons/back.svg";

interface IProps {
  handleBackButton: () => void;
  protocolName: string;
  protocolIcon: JSX.Element;
}

const ProtocolNavigation = ({
  handleBackButton,
  protocolName,
  protocolIcon,
}: IProps) => {
  return (
    <div className="flex items-center justify-between">
      <button onClick={handleBackButton}>
        <BackIcon />
        Back
      </button>
      <div className="flex items-center justify-between">
        {protocolIcon}
        <div>{protocolName}</div>
      </div>
    </div>
  );
};

export default ProtocolNavigation;
