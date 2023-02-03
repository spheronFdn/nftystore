import React from "react";
import ButtonStyle from "../../styles/button.module.css";

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
      disabled={disabled}
      onClick={handleClick}
    >
      {title}
      {loading && <div>Loading...</div>}
    </button>
  );
};

export default FilledPrimaryButton;
