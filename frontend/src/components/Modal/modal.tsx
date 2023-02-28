import React from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-modal.svg";
import { listData } from "../../common/utils";
import ModalStyle from "../../styles/modal.module.css";

interface IProps {
  setModalOpen: (modalOpen: boolean) => void;
  modalHeading: string;
}
const Modal = ({ setModalOpen, modalHeading }: IProps) => {
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <div className={ModalStyle.modal__background}>
      <div className={ModalStyle.modal}>
        <div className={ModalStyle.modal__close} onClick={handleModalClose}>
          <CloseIcon />
        </div>
        <div className={ModalStyle.modal__heading}>{modalHeading}</div>
        <ul>
          {listData.map((list) => (
            <li key={list.id} className={ModalStyle.modal__list}>
              {list.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
