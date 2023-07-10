import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import { useParams, useNavigate } from "react-router-dom";
import "../../../../styles/projects/boards/cards/SelectedCardModal.css";

import type { Card } from "../../../../../types/types";
import { getActiveUser } from "../../../../../slices/userSlice";
import { CloseRounded } from "@mui/icons-material";

// Components
import TodoListForm from "./TodoListForm";
import AddCardTagForm from "./AddCardTagForm";

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
  }, [activeUser, boardID, cardID, projectID, setSelectedCard]);

  // Tags state

  return selectedCard !== undefined && projectID !== undefined ? (
    <div
      className='selected-card-modal-bg'
      onClick={() =>
        navigate(`/${activeUser.userID}/projects/${parseInt(projectID)}`)
      }
    >
      <div className='selected-card-modal' onClick={(e) => e.stopPropagation()}>
        <div className='selected-card-nav'>
          <div className='header2'>{selectedCard.cardTitle}</div>

          <div
            className='close-card-modal'
            onClick={() =>
              navigate(`/${activeUser.userID}/projects/${parseInt(projectID)}`)
            }
          >
            <CloseRounded fontSize='small' />
          </div>
        </div>

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

        <TodoListForm todos={selectedCard.todos} />
      </div>
    </div>
  ) : (
    <div>undefined selectedCard</div>
  );
};

export default SelectedCardModal;
