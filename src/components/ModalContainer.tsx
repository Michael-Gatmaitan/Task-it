import React from "react";

interface ModalBGProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modalbackground: React.FC<ModalBGProps> = (props) => {
  const { showModal, setShowModal } = props;

  const hideModal = () => setShowModal(false);

  const ModalBackgroundStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgb(0, 0, 0)",
    opacity: 0.5,
  };

  return showModal ? (
    <div
      className='modal-background'
      onClick={hideModal}
      style={ModalBackgroundStyles}
    />
  ) : null;
};

export default Modalbackground;
