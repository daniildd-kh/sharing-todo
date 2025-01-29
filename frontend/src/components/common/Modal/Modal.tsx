import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.scss";
import clsx from "clsx";
import { Button } from "../Button/Button";
import IconSvg from "../Icons/IconSvg";

interface ModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  handleClose?: () => void;
}

export const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.classList.add(style.modalOpen);
    } else {
      document.body.classList.remove(style.modalOpen);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }
  return createPortal(
    <div
      className={clsx(style.modalOverlay, { [style.fadeOut]: !isOpen })}
      onClick={handleClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <Button onClick={handleClose} className={style.close}>
          <IconSvg name="close" size={14} />
        </Button>
        {children}
      </div>
    </div>,
    document.body
  );
};

interface ModalWithTriggerProps {
  children?: ReactNode;
  buttonText?: ReactNode;
  className?: string;
}

export const ModalWithTrigger = ({
  children,
  buttonText,
  className,
}: ModalWithTriggerProps) => {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);
  return (
    <>
      <Button onClick={handleModalOpen} className={className}>
        {buttonText}
      </Button>

      <Modal isOpen={showModal} handleClose={handleModalClose}>
        {children}
      </Modal>
    </>
  );
};
