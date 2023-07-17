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

  return selectedCard !== undefined && projectID !== undefined ? (
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
          setShowDeleteModal={setShowDeleteModal}
          cardTitle={selectedCard.cardTitle}
          activeUserID={activeUser.userID}
          projectID={projectID}
        />

        <div className='card-description body-text'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
          inventore, ut eligendi pariatur ipsam dolores consequatur molestias
          facere, dolorem provident alias sed ab atque a vel natus dignissimos
          nostrum incidunt! Suscipit quisquam illo deserunt, impedit autem
          cupiditate eos alias aliquam vel, mollitia, laudantium dicta soluta
          iure fugiat iste atque facere. Saepe deserunt incidunt aliquid
          repellat ratione dignissimos aut fugiat veritatis?
        </div>

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
    <div className='selected-card-undefined'>
      <Skeleton className='card-skeleton'>Undefineeeed</Skeleton>
    </div>
  );
};

export default SelectedCardModal;
