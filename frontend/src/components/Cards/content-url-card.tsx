import React from "react";
import CardStyle from "../../styles/card.module.css";

interface IProps {
  isActive: boolean;
  setSelectedUrl: (url: string) => void;
  contentProvider: string;
  link: string;
  isFocused: boolean;
}

const ContentUrlCard = ({
  isActive,
  setSelectedUrl,
  contentProvider,
  link,
  isFocused,
}: IProps) => {
  return (
    <div
      role="presentation"
      onClick={() => {
        setSelectedUrl(link);
      }}
      className={`${isFocused && CardStyle.contenturl__card__focused} ${
        CardStyle.contenturl__card
      }`}
    >
      <div className={CardStyle.contenturl__card__content}>
        <div>
          <span>{contentProvider} Generated</span>
          <div
            className={
              !isActive
                ? CardStyle.contenturl__card__radio
                : CardStyle.contenturl__card__radio__active
            }
          >
            {isActive && (
              <div className={CardStyle.contenturl__card__radio__circle} />
            )}
          </div>
        </div>
        <div className={CardStyle.contenturl__card__link__container}>
          <a href={link} rel="noreferrer" target="_blank">
            https://dasjfl;ajf;ldsj;fja;dfjaifhohdcah
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContentUrlCard;
