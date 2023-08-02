import React from "react";

import { Card as CardType } from "../../../../../types/types";
import { ChecklistRounded } from "@mui/icons-material";
import { useAppDispatch } from "../../../../../app/hooks";
import {
  setCustomUrlID,
  toggleShowCardModal,
} from "../../../../../slices/stateSlice";

import "../../../../styles/projects/boards/cards/Card.css";

interface CardProps {
  card: CardType;
  boardID: number;
  cardID: number;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { card, cardID, boardID } = props;

  const dispatch = useAppDispatch();
  const countOfCompletedTodo = card.todos.filter(
    (todo) => todo.checked === true
  ).length;

  const isAllTodoCompleted =
    card.todos.length && countOfCompletedTodo === card.todos.length;

  return (
    <div
      onClick={() => {
        // setShowCardModal(true);

        dispatch(toggleShowCardModal(true));

        dispatch(setCustomUrlID({ key: "cardID", value: cardID }));
        dispatch(setCustomUrlID({ key: "boardID", value: boardID }));
      }}
      className='card bordered-container'
    >
      <div className='card-title'>{card.cardTitle}</div>
      <div className='card-infos'>
        <div
          className='card-todo-count'
          style={{
            color: isAllTodoCompleted ? "#20ff40" : "#000",
          }}
        >
          <ChecklistRounded fontSize='small' />
          <div className='label'>
            {card.todos.length !== 0
              ? `${countOfCompletedTodo} / ${card.todos.length}`
              : "None"}
          </div>
        </div>

        <div className='card-tags'>
          {card.cardTags.map((cardTag) => (
            <div key={cardTag.cardTagID} className='card-tag'>
              {cardTag.cardTagTitle}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
