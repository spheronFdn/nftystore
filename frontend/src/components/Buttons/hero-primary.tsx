import React from "react";
import ButtonStyle from "../../styles/button.module.css";

interface IProps {
  title: string;
  loading: boolean;
  disabled: boolean;
  handleClick: () => void;
}

const HeroPrimaryButton = ({
  title,
  loading,
  disabled,
  handleClick,
}: IProps) => {
  return (
    <button
      className={ButtonStyle.hero__button}
      disabled={disabled}
      onClick={handleClick}
    >
      {title}
      {loading && <>Loading...</>}
    </button>
  );
};

export default HeroPrimaryButton;
