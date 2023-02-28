import React from "react";
import { useNavigate } from "react-router-dom";
import FilledPrimaryButton from "../../components/Buttons/filled-primary";
import HeroPrimaryButton from "../../components/Buttons/hero-primary";
import HeroButton from "../../components/Buttons/hero-primary";
import HomeStyle from "../../styles/home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const nextStep = () => {
    navigate("/nft-upload/select-provider");
  };

  return (
    <div className={HomeStyle.container}>
      <div className={HomeStyle.container__content}>
        <div className={HomeStyle.container__left__moon} />
        <div className={HomeStyle.container__center__left__moon} />
        <div className={HomeStyle.container__center__right__moon} />
        <div className={HomeStyle.container__left__star} />
        <div className={HomeStyle.container__right__star} />
        {/* Look into right moon more */}
        {/* <div className={HomeStyle.container__right__moon}></div> */}
        <div className={HomeStyle.container__subtitle__div}>
          <div className={HomeStyle.container__subtitle}>
            Be at the top of NFT revolution
          </div>
        </div>

        <span className={HomeStyle.container__title}>
          Build Your{" "}
          <span className={HomeStyle.container__title__span}>
            NFT Collection
          </span>{" "}
          in <br /> three simple steps
        </span>
        <span className={HomeStyle.container__paragraph}>
          Upload your NFT collection assets faster via Spheron multi-chain
          upload!
        </span>
        <div className={HomeStyle.container__button__div}>
          <FilledPrimaryButton
            title="Get Started"
            loading={false}
            disabled={false}
            handleClick={nextStep}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
