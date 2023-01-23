import React from "react";
import CardStyle from "../../styles/card.module.css";

interface IProps {
  cardId: string;
  isActive: boolean;
  setActive: (id: string) => void;
  contentIcon: JSX.Element;
  contentProvider: string;
  link: string;
  isFocused: boolean;
}

const ContentUrlCard = ({
  cardId,
  isActive,
  setActive,
  contentIcon,
  contentProvider,
  link,
  isFocused,
}: IProps) => {
  return (
    <div
      role="presentation"
      onClick={() => setActive(cardId)}
      className={`${isFocused && CardStyle.contenturl__card__focused} ${
        CardStyle.contenturl__card
      }`}
    >
      <div className={CardStyle.contenturl__card__content}>
        <div className={CardStyle.contenturl__card__link__con}>
          <div className="flex">
            <div className={CardStyle.contenturl__card__content__icon}>
              {contentIcon}
            </div>
            <div>
              <h4>{contentProvider}</h4>
              <a href={link} target="_blank" rel="noreferrer">
                {link}
              </a>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default ContentUrlCard;
