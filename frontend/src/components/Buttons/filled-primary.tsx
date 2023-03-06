import React from "react";
import ButtonStyle from "../../styles/button.module.css";
import SpinLoader from "../Loaders/spin-loader";

interface IProps {
  title: string;
  loading: boolean;
  disabled: boolean;
  handleClick: () => void;
}

const FilledPrimaryButton = ({
  title,
  loading,
  disabled,
  handleClick,
}: IProps) => {
  return (
    <button
      className={ButtonStyle.primary__button}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {title}
      {loading && <SpinLoader />}
    </button>
  );
};

export default FilledPrimaryButton;
