import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../../app/hooks";
import { useParams, useNavigate } from "react-router-dom";
import "../../../../../styles/projects/boards/cards/SelectedCardModal.css";

import type { Card } from "../../../../../../types/types";
import { deleteCard, getActiveUser } from "../../../../../../slices/userSlice";

// Components
import SelectedCardNav from "./SelectedCardNav";
import TodoListForm from "./TodoListForm";
import AddCardTagForm from "./AddCardTagForm";

import DeleteModal from "../../../../modals/DeleteModal";
import TodoProgressBar from "./TodoProgressBar";

// Mui
import { Skeleton } from "@mui/material";

const SelectedCardModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeUser = useAppSelector(getActiveUser);
  const params = useParams();
  const { projectID, boardID, cardID } = params;

  const [selectedCard, setSelectedCard] = useState<Card | undefined>(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // Keypress - if user pres 'esc', close the modal.
  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === "Escape")
        navigate(`/${activeUser.userID}/projects/${parseInt(projectID)}`);
    };

    window.addEventListener("keydown", handleEvent);

    return () => {
      window.removeEventListener("keydown", handleEvent);
    };
  }, []);

  useEffect(() => {
    let initialSelectedCard: Card | undefined = undefined;

    if (
      projectID !== undefined &&
      boardID !== undefined &&
      cardID !== undefined
    ) {
      initialSelectedCard = activeUser.projects
        .find((pr) => pr.projectID === parseInt(projectID))
        ?.boards.find((br) => br.boardID === parseInt(boardID))
        ?.cards.find((cr) => cr.cardID === parseInt(cardID));
    }

    setSelectedCard(initialSelectedCard);

    console.log("Selected card:", initialSelectedCard);
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
      navigate(`/${activeUser.userID}/projects/${parseInt(projectID)}`);
      dispatch(deleteCard({ projectID, boardID, cardID }));
    }
  };

  const renderOptions =
    selectedCard !== undefined &&
    projectID !== undefined &&
    boardID !== undefined &&
    cardID !== undefined;

  return renderOptions ? (
    <div
      className='selected-card-modal-bg'
      onClick={() =>
        navigate(`/${activeUser.userID}/projects/${parseInt(projectID)}`)
      }
    >
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        componentNameToDelete={componentNameToDelete}
        onDeleteFunction={handleDeleteCard}
      />

      <div className='selected-card-modal' onClick={(e) => e.stopPropagation()}>
        <SelectedCardNav
          cardTitle={selectedCard.cardTitle}
          cardDescription={selectedCard.cardDescription}
          setShowDeleteModal={setShowDeleteModal}
          activeUserID={activeUser.userID}
          projectID={projectID}
          boardID={boardID}
          cardID={cardID}
        />

        {/* Submit : addCardTag */}
        <AddCardTagForm cardTags={selectedCard.cardTags} params={params} />

        <TodoProgressBar selectedCardTodos={selectedCard.todos} />

        <TodoListForm todos={selectedCard.todos} />
      </div>
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
