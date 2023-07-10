import React from "react";

import { Card as CardType } from "../../../../../types/types";
import "../../../../styles/projects/boards/cards/Card.css";
import { ChecklistRounded } from "@mui/icons-material";

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className='card bordered-container'>
      <div className='card-title'>{card.cardTitle}</div>
      <div className='card-infos'>
        <div className='card-todo-count'>
          <ChecklistRounded fontSize='small' />
          <span className='label'>{card.todos.length}</span>
        </div>

        <div className='card-tags'>
          {card.cardTags.map((cardTag) => (
            <div key={cardTag.cardTagID}>Tag {cardTag.cardTagTitle}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
