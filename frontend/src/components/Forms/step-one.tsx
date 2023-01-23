import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilledPrimaryButton from "../Buttons/filled-primary";
import ProtocolProvider from "../ProtocolProvider";

const StepOne = () => {
  const navigate = useNavigate();
  const [protocol, setProtocol] = useState<string>("");
  const handleNext = (protocol: string): void => {
    navigate(`/nft-upload/2?protocol=${protocol}`);
  };

  return (
    <>
      <h1>Select Protocol</h1>
      <ProtocolProvider setProtocol={setProtocol} selectedProtocol={protocol} />
      <div
        className="flex items-center justify-center"
        style={{ marginTop: "100px" }}
      >
        <FilledPrimaryButton
          title={"Next"}
          loading={false}
          disabled={!Boolean(protocol)}
          handleClick={() => handleNext(protocol)}
        />
      </div>
    </>
  );
};

export default StepOne;