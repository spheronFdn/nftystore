import React from "react";
import { ReactComponent as DisableCheckbox } from "../../assets/icons/disable-checkbox.svg";
import { ReactComponent as EnableCheckbox } from "../../assets/icons/enable-checkbox.svg";
import InputStyle from "../../styles/input.module.css";
import DropzoneStyle from "../../styles/dropzone.module.css";

interface IProps {
  heading: string;
  placeholder: string;
  description: string;
  descriptionLink: string;
  descriptionLinkText: string;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}
const Input = ({
  heading,
  placeholder,
  description,
  descriptionLink,
  descriptionLinkText,
  inputValue,
  setInputValue,
}: IProps) => {
  return (
    <>
      <h4 className={InputStyle.input__heading}>{heading}*</h4>
      {description.length > 0 && (
        <div className={InputStyle.input__subheading}>
          {description}
          <a
            target="_blank"
            href={descriptionLink}
            className={InputStyle.input__content__link}
          >
            {descriptionLinkText}
          </a>
        </div>
      )}

      <div className={InputStyle.input__section}>
        <input
          className={InputStyle.input__collection}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue ? (
          <EnableCheckbox className={InputStyle.input__icon} />
        ) : (
          <DisableCheckbox className={InputStyle.input__icon} />
        )}
      </div>
    </>
  );
};

export default Input;
