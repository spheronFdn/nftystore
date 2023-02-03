import React from "react";
import { useNavigate } from "react-router-dom";
import HeroButton from "../../components/Buttons/hero-primary";
import HomeStyle from "../../styles/home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const nextStep = () => {
    navigate("/nft-upload/1");
  };

  return (
    <div className={HomeStyle.container}>
      <div className={HomeStyle.container__content}>
        <div>
          <span>Be at the top of nft revolution</span>
          <h1>
            Mint your NFT <br />
            in three simple steps<span>.</span>
          </h1>
        </div>
        <HeroButton
          title="Get Started"
          loading={false}
          disabled={false}
          handleClick={nextStep}
        />
      </div>
    </div>
  );
};

export default Home;
