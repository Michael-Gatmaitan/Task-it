import React, { useState } from "react";
import type { Card as CardType } from "../../../../types/types";
import { useAppDispatch } from "../../../../app/hooks";
import { addCard } from "../../../../slices/userSlice";
import { TextField, Button } from "@mui/material";

interface CardMakerProps {
  projectID: number;
  boardID: number;

  setShowCardMaker: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardMaker: React.FC<CardMakerProps> = (props: CardMakerProps) => {
  const { projectID, boardID, setShowCardMaker } = props;
  const dispatch = useAppDispatch();

  const [newCard, setNewCard] = useState<CardType>({
    cardTitle: "",
    cardDescription: "",
    cardTags: [],
    todos: [],
    cardID: Number.MAX_VALUE,
  });

  const handleSubmitAddCard = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log("Card created.");
    dispatch(addCard({ projectID, boardID, newCard }));
    setShowCardMaker(false);
  };

  const handleOnTitleInputBlur = () => {
    // If submit is clicked and input looses focus, continue submitting and ignore the code below
    console.log("Blurred uysing mouse dwon");
    setShowCardMaker(false);
  };

  const handleOnCardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCard((defaultValues) => ({
      ...defaultValues,
      cardTitle: e.target.value,
    }));
  };

  return (
    <div className='card-maker'>
      <form id='card-maker-form' onSubmit={handleSubmitAddCard}>
        <TextField
          variant='outlined'
          label='Card Title'
          autoFocus
          onChange={handleOnCardTitleChange}
          onBlur={handleOnTitleInputBlur}
        />

        <div className='card-maker-buttons'>
          <Button
            type='submit'
            variant='contained'
            disabled={newCard.cardTitle.trim() === ""}
            // This mousedown event prevents running the blur event first
            // that causes user not to add a card, do not use onClick here
            onMouseDown={handleSubmitAddCard}
          >
            Add
          </Button>

          <Button
            variant='outlined'
            onClick={() => {
              setShowCardMaker(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CardMaker;
