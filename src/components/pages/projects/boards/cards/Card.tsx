import React from "react";

import { Card as CardType } from "../../../../../types/types";
import "../../../../styles/projects/boards/cards/Card.css";
import { ChecklistRounded } from "@mui/icons-material";

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const countOfCompletedTodo = card.todos.filter(
    (todo) => todo.checked === true
  ).length;

  const isAllTodoCompleted =
    card.todos.length && countOfCompletedTodo === card.todos.length;

  return (
    <div className='card bordered-container'>
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
