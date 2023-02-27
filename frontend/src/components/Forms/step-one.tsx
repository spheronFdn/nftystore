import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import FilledPrimaryButton from "../Buttons/filled-primary";
import ProtocolProvider from "../ProtocolProvider";
import StepOneStyle from "../../styles/stepone.module.css";

const StepOne = () => {
  const navigate = useNavigate();
  const [protocol, setProtocol] = useOutletContext<any>();
  const handleNext = (protocol: string): void => {
    navigate(`/nft-upload/upload-files?protocol=${protocol}`);
  };

  return (
    <>
      <div className={StepOneStyle.step__heading}>Select protocol</div>
      <div className={StepOneStyle.step__subheading}>
        Please click on a protocol that suits your needs
      </div>
      <ProtocolProvider setProtocol={setProtocol} selectedProtocol={protocol} />
      <div className={StepOneStyle.step__button__div}>
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
