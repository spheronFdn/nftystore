import React from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-modal.svg";
import ModalStyle from "../../styles/modal.module.css";

interface IProps {
  setModalOpen: (modalOpen: boolean) => void;
  modalHeading: string;
  modalContent: any; // infer better type
}
const Modal = ({ setModalOpen, modalHeading, modalContent }: IProps) => {
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
        {modalContent}
      </div>
    </div>
  );
};

export default Modal;
