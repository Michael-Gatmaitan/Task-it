import React from "react";

interface ModalBGProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const ModalContainer: React.FunctionComponent<ModalBGProps> = (props) => {
  const { showModal, setShowModal } = props;

  const hideModal = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowModal(false);
    e.stopPropagation();
  };

  const ModalContainerStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 101,
  };

  return showModal ? (
    <div
      className='modal-background'
      onClick={hideModal}
      style={ModalContainerStyles}
    >
      {props.children}
    </div>
  ) : null;
};

export default ModalContainer;

// Elise
// https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/225249909_508278883777915_6233375170140775951_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFQBFotULnyUS8w-iZm2XibBjIwt0u6SLUGMjC3S7pItUpO_YgmmJUJKW5RaOJ0KibYYHf7F8VHkQ2p5_4jNGvK&_nc_ohc=r4LgQkI0xjAAX_MToQe&_nc_ht=scontent.fcrk1-5.fna&oh=00_AfA3oKXjqSBQPoydyWDVyUlF8bwg0IJROFEAI08UMC9Fqw&oe=64937BC8

// Athena
// https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/274008017_1449394295476700_7640073939807135005_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEsMq--KOUvbH1pWjoP3gnQ4CsBFlnFqzjgKwEWWcWrOHNrlGyzwfNRbaFEbNOqZEJOnhADtlo-T9ALX34wowQo&_nc_ohc=QPcz-IuXPbYAX_rxVbu&_nc_ht=scontent.fcrk1-1.fna&oh=00_AfDSexHnfvGqLWC9JgpimmtShxGe9DeEIHwPKpN9v_swFQ&oe=6493F585
