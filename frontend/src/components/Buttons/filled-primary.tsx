import React from "react";

interface IProps {
  title: string;
  loading: boolean;
  disabled: boolean;
  handleClick: () => void;
}

const FilledPrimayButton = ({
  title,
  loading,
  disabled,
  handleClick,
}: IProps) => {
  return <div>FilledPrimayButton</div>;
};

export default FilledPrimayButton;
