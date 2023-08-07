import React from "react";
import { Button } from "@mui/material";
import "../../styles/modals/DeleteModal.css";
import { propagationStopper } from "./propagationStopper";
import { motion } from "framer-motion";
import { variantsForModals } from "../../../framer-motion-variants";

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
    <motion.div
      className='delete-modal-bg modal-container-background'
      onClick={closeModal}
      {...variantsForModals}
    >
      <div
        className='bordered-container delete-modal header2 modal'
        onClick={propagationStopper}
      >
        Are you sure you want to delete this {componentNameToDelete}?
        <div className='delete-modal-buttons'>
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              onDeleteFunction();
              setShowDeleteModal(false);
            }}
          >
            Delete
          </Button>
          <Button variant='outlined' onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </motion.div>
  ) : null;
};

export default DeleteModal;
