import React from "react";
import { useNavigate } from "react-router-dom";
import CardStyle from "../../styles/card.module.css";

const Home = () => {
  const navigate = useNavigate();

  const nextStep = () => {
    navigate("/nft-upload/1");
  };

  return (
    <div>
      <h1 className="text-white">Get Started</h1>
      <div className={CardStyle.card__container} onClick={nextStep}>
        <div className={CardStyle.card}>
          <h1>Click here to get started</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
