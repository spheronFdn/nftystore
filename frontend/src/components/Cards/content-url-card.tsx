import React from "react";
import CardStyle from "../../styles/card.module.css";
import { ReactComponent as Link } from "../../assets/icons/link.svg";
import Info from "../../assets/icons/info-icon.svg";

interface IProps {
  isActive: boolean;
  setSelectedUrl: (url: string) => void;
  contentProvider: string;
  link: string;
  isFocused: boolean;
  image: string;
}

const ContentUrlCard = ({
  isActive,
  setSelectedUrl,
  contentProvider,
  link,
  isFocused,
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
              Recommended <img style={{ marginLeft: "0.3rem" }} src={Info} />
              <div className={CardStyle.information__div}>
                We recommend using Spheron Gateway as it is super-charged with
                edge CDN.
              </div>
            </div>
          ) : null}

          {/* <div
            className={
              !isActive
                ? CardStyle.contenturl__card__radio
                : CardStyle.contenturl__card__radio__active
            }
          >
            {isActive && (
              <div className={CardStyle.contenturl__card__radio__circle} />
            )}
          </div> */}
        </div>
        <div className={CardStyle.contenturl__card__link__container}>
          <Link className={CardStyle.link__icon} />
          <a href={link} rel="noreferrer" target="_blank">
            {/* {link} */} https://example.com/article/social-share-modal
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContentUrlCard;
