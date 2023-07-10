import React, { useState } from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { TextField, Button, Chip } from "@mui//material";

// Style
import "../../../../styles/projects/boards/cards/AddCardTagForm.css";
import { CardTag, ReactRouterParamsType } from "../../../../../types/types";
import { handleCardTag } from "../../../../../slices/userSlice";

interface AddCardTagFormProps {
  params: ReactRouterParamsType;
  cardTags: CardTag[];
}

const AddCardTagForm: React.FC<AddCardTagFormProps> = (
  props: AddCardTagFormProps
) => {
  const dispatch = useAppDispatch();
  const { params, cardTags } = props;

  const [newCardTag, setNewCardTag] = useState<string>("");

  const handleAddCardTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      handleCardTag({
        type: "add",
        cardTagTitle: newCardTag,
        idPaths: {
          projectID: params.projectID,
          boardID: params.boardID,
          cardID: params.cardID,
        },
      })
    );

    console.log(params.cardID);

    setNewCardTag("");
  };

  const handleDeleteCardTag = (cardTagID: number) => {
    dispatch(
      handleCardTag({
        type: "delete",
        cardTagID: cardTagID,
        idPaths: {
          projectID: params.projectID,
          boardID: params.boardID,
          cardID: params.cardID,
        },
      })
    );
  };

  return (
    <>
      <div className='card-tags'>
        {cardTags.map((cardTag) => (
          <Chip
            label={cardTag.cardTagTitle}
            onDelete={() => handleDeleteCardTag(cardTag.cardTagID)}
            key={cardTag.cardTagID}
          />
        ))}
      </div>

      <form className='add-card-tag' onSubmit={handleAddCardTag}>
        <div className='header3'>Add Card Tag</div>

        <TextField
          variant='outlined'
          label='Add card tag'
          value={newCardTag}
          onChange={(e) => setNewCardTag(e.target.value)}
        />

        <Button
          type='submit'
          disabled={newCardTag.trim() === ""}
          variant='contained'
        >
          Add
        </Button>
      </form>
    </>
  );
};

export default AddCardTagForm;
