import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../../../../app/hooks";
import { useParams, useNavigate } from "react-router-dom";
import "../../../../../styles/projects/boards/cards/SelectedCardModal.css";

import type { Card } from "../../../../../../types/types";
import { getActiveUser } from "../../../../../../slices/userSlice";

// Components
import SelectedCardNav from "./SelectedCardNav";
import TodoListForm from "./TodoListForm";
import AddCardTagForm from "./AddCardTagForm";

import DeleteModal from "../../../../modals/DeleteModal";

const SelectedCardModal: React.FC = () => {
  const navigate = useNavigate();
  const activeUser = useAppSelector(getActiveUser);
  const params = useParams();
  const { projectID, boardID, cardID } = params;

  const [selectedCard, setSelectedCard] = useState<Card | undefined>(undefined);

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
    console.log("card deleted");
  };

  const [completedTodos, setCompletedTodos] = useState<number>(0);

  useEffect(() => {
    if (selectedCard === undefined) return;
    let completed = 0;

    const { todos } = selectedCard;
    todos.forEach((todo) => {
      if (todo.checked) {
        completed += 1;
      }
    });

    setCompletedTodos(completed);
  }, [selectedCard]);

  // const calculateTodoProgressWidth = useMemo(() => {
  //   return completedTodos === 0
  //     ? 0
  //     : selectedCard !== undefined
  //     ? (completedTodos / selectedCard.todos.length) * 100
  //     : 0;
  // }, [completedTodos, selectedCard]);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(true);

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

        <div
          className='todo-progress'
          style={{
            height: "4px",
            width: `${
              (selectedCard.todos.length === 0
                ? 0
                : completedTodos / selectedCard.todos.length) * 100
            }%`,
            backgroundColor: "#f00",
            transition: "0.1s ease-in",
          }}
        />

        <TodoListForm todos={selectedCard.todos} />
      </div>
    </div>
  ) : null;
};

export default SelectedCardModal;
