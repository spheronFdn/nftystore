import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CongratulationsIcon } from "../../assets/icons/congratulations.svg";
import FilledPrimaryButton from "../../components/Buttons/filled-primary";
import SuccessStyle from "../../styles/success.module.css";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className={SuccessStyle.container}>
      <CongratulationsIcon />
      <h1 className={SuccessStyle.title}>Congratulations</h1>
      <a href={"http://something.com"}>
        https://ipfs.io/adsjkklsaclksadjclkdjclknakvdsai234den
      </a>
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
