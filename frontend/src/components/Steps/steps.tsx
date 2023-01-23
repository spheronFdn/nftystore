import React from "react";

interface IProps {
  step: number;
  description: string;
  active: boolean;
}

const Steps = ({ step, description, active }: IProps) => {
  return <div className="flex"></div>;
};

Steps.defaultProps = { active: false };

export default Steps;
