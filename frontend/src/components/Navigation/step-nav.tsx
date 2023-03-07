import React from "react";
import { useNavigate } from "react-router-dom";
import NavStyle from "../../styles/navigation.module.css";
import Step from "../Steps/step";

interface IProps {
  currentStep: number;
}

interface IStep {
  id: number;
  priority: number;
  onClick: () => void;
}

const StepNav = ({ currentStep }: IProps) => {
  const navigate = useNavigate();
  const Steps: IStep[] = [
    {
      id: 1,
      priority: 1,
      onClick: () => navigate("/nft-upload/select-provider"),
    },
    { id: 2, priority: 2, onClick: () => navigate("/nft-upload/upload-files") },
    { id: 3, priority: 3, onClick: () => navigate("/nft-upload/choose-url") },
  ];

  return (
    <div className={NavStyle.step__container}>
      <div>
        {Steps.map((step: IStep) => (
          <Step
            key={step.id}
            currentStep={currentStep}
            stepPriority={step.priority}
            handleClick={step.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default StepNav;
