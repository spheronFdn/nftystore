import React from "react";
import { ReactComponent as Link } from "../../assets/icons/link.svg";
import { ReactComponent as Info } from "../../assets/icons/info-icon.svg";
import CardStyle from "../../styles/card.module.css";

interface IProps {
  isActive: boolean;
  setSelectedUrl: (url: string) => void;
  contentProvider: string;
  link: string;
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
  image: string;
}

const ContentUrlCard = ({
  isActive,
  setSelectedUrl,
  contentProvider,
  link,
  isFocused,
  setIsFocused,
  image,
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
          <img src={image} />
          <span className={CardStyle.content__title}>
            {contentProvider} Gateway
          </span>
          {contentProvider === "Spheron" ? (
            <div className={CardStyle.recommended__div}>
              Recommended <Info className={CardStyle.info__icon} />
              <div className={CardStyle.information__div}>
                We recommend using Spheron Gateway as it is super-charged with
                edge CDN.
              </div>
            </div>
          ) : null}
        </div>
        <div className={CardStyle.contenturl__card__link__container}>
          <Link className={CardStyle.link__icon} />
          <a href={link} rel="noreferrer" target="_blank">
            {link}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContentUrlCard;
