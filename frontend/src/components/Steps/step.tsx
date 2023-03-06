import React from "react";
import NavStyle from "../../styles/navigation.module.css";

interface IProps {
  currentStep: number;
  stepPriority: number;
  handleClick: () => void;
}

const Step = ({ currentStep, stepPriority, handleClick }: IProps) => {
  const isActive: boolean = currentStep >= stepPriority;
  return (
    <button
      role="presentation"
      disabled={!isActive}
      onClick={handleClick}
      className={`${isActive && NavStyle.step__line__active} ${
        NavStyle.step__line
      }`}
    />
  );
};

export default Step;
