import React, { useState, useEffect } from "react";
import { titleChanger } from "../../../../../../app/titleChanger";

import { useAppSelector, useAppDispatch } from "../../../../../../app/hooks";
import "../../../../../styles/projects/boards/cards/SelectedCardModal.css";

import type { Card } from "../../../../../../types/types";
import { deleteCard, getActiveUser } from "../../../../../../slices/userSlice";

// Components
import SelectedCardNav from "./SelectedCardNav";
import TodoListForm from "./TodoListForm";
import AddCardTagForm from "./AddCardTagForm";

import DeleteModal from "../../../../modals/DeleteModal";
import TodoProgressBar from "./TodoProgressBar";

import { motion } from "framer-motion";
import { variantsForModals } from "../../../../../../framer-motion-variants";

// Mui
import { Skeleton } from "@mui/material";
import {
  getUrlIDs,
  toggleShowCardModal,
} from "../../../../../../slices/stateSlice";

const SelectedCardModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeUser = useAppSelector(getActiveUser);

  const { projectID, boardID, cardID } = useAppSelector(getUrlIDs);

  const [selectedCard, setSelectedCard] = useState<Card | undefined>(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const closeModal = () => dispatch(toggleShowCardModal(true));

  useEffect(() => {
    if (selectedCard !== undefined)
      titleChanger({ cardTitle: selectedCard.cardTitle });
  }, [selectedCard]);

  // Keypress - if user pres 'esc', close the modal.
  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === "Escape" && projectID !== undefined) closeModal();
    };

    console.log(projectID, boardID, cardID);

    window.addEventListener("keydown", handleEvent);

    return () => {
      window.removeEventListener("keydown", handleEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let initialSelectedCard: Card | undefined = undefined;

    if (
      projectID !== undefined &&
      boardID !== undefined &&
      cardID !== undefined
    ) {
      initialSelectedCard = activeUser.projects
        .find((pr) => pr.projectID === projectID)
        ?.boards.find((br) => br.boardID === boardID)
        ?.cards.find((cr) => cr.cardID === cardID);

      setSelectedCard(initialSelectedCard);

      console.log("Selected card:", initialSelectedCard);
    } else {
      console.log("something is undefined", projectID, boardID, cardID);
    }
  }, [activeUser.projects, boardID, cardID, projectID]);

  // delete modal purposes
  const componentNameToDelete = "card";
  const handleDeleteCard = () => {
    if (
      projectID !== undefined &&
      boardID !== undefined &&
      cardID !== undefined
    ) {
      // Navigate to main project before deleting the board's card
      closeModal();
      dispatch(deleteCard({ projectID, boardID, cardID }));
    }
  };

  const renderOptions =
    selectedCard !== undefined &&
    projectID !== undefined &&
    boardID !== undefined &&
    cardID !== undefined;

  return renderOptions ? (
    <div className='selected-card-modal-bg' onClick={() => closeModal()}>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        componentNameToDelete={componentNameToDelete}
        onDeleteFunction={handleDeleteCard}
      />

      <motion.div
        className='selected-card-modal'
        onClick={(e) => e.stopPropagation()}
        {...variantsForModals}
      >
        <SelectedCardNav
          cardTitle={selectedCard.cardTitle}
          cardDescription={selectedCard.cardDescription}
          setShowDeleteModal={setShowDeleteModal}
          projectID={projectID}
          boardID={boardID}
          cardID={cardID}
        />

        {/* Submit : addCardTag */}
        <AddCardTagForm cardTags={selectedCard.cardTags} />

        <TodoProgressBar selectedCardTodos={selectedCard.todos} />

        <TodoListForm todos={selectedCard.todos} />
      </motion.div>
    </div>
  ) : (
    <SelectedCardUndefined />
  );
};

const SelectedCardUndefined: React.FC = () => {
  return (
    <Skeleton variant='rounded' className='selected-card-undefined'>
      <div className='card-skeleton'>Undefineeeed</div>
    </Skeleton>
  );
};

export default SelectedCardModal;
