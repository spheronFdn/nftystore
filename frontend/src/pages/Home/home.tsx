import React from "react";
import { useNavigate } from "react-router-dom";
import HeroButton from "../../components/Buttons/hero-primary";
import CardStyle from "../../styles/card.module.css";
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
          <h1>Mint your NFT</h1>
          <p>in three simple steps</p>
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
