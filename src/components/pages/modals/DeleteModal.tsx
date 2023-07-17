import React from "react";
import { Button } from "@mui/material";
import "../../styles/modals/DeleteModal.css";
import { propagationStopper } from "./propagationStopper";

interface DeleteModalProps {
  componentNameToDelete: string;

  // Modal on close
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteFunction: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = (props: DeleteModalProps) => {
  const {
    showDeleteModal,
    setShowDeleteModal,
    componentNameToDelete,
    onDeleteFunction,
  } = props;

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setShowDeleteModal((prev) => !prev);
  };

  return showDeleteModal ? (
    <div
      className='delete-modal-bg modal-container-background'
      onClick={closeModal}
    >
      <div
        className='bordered-container delete-modal header2 modal'
        onClick={propagationStopper}
      >
        Are you sure you want to delete this {componentNameToDelete}?
        <div className='delete-modal-buttons'>
          <Button variant='contained' color='error' onClick={onDeleteFunction}>
            Delete
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              setShowDeleteModal(false);
              console.log("closed? ", showDeleteModal);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default DeleteModal;
