import React from "react";
import NavStyle from "../../styles/navigation.module.css";

interface IProps {
  currentStep: number;
  stepPriority: number;
  handleClick: () => void;
}

const Step = ({ currentStep, stepPriority, handleClick }: IProps) => {
  console.log(currentStep, "cs");
  console.log(stepPriority, "sp");

  const isActive: boolean = currentStep >= stepPriority;
  return (
    <>
      <button
        role="presentation"
        disabled={!isActive}
        onClick={handleClick}
        className={`${isActive && NavStyle.step__line__active} ${
          NavStyle.step__line
        }`}
      >
        {stepPriority}
      </button>
      <hr
        className={`${
          stepPriority === 3
            ? NavStyle.step__divider__none
            : NavStyle.step__divider
        }`}
      />
    </>
  );
};

export default Step;
