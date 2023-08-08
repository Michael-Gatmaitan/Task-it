import React, { useState } from "react";
import { useAppDispatch } from "../../../../../../app/hooks";
import { TextField, Button, Chip } from "@mui//material";

// Style
import "../.././../../../styles/projects/boards/cards/AddCardTagForm.css";
import { CardTag } from "../../../../../../types/types";
import { handleCardTag } from "../../../../../../slices/userSlice";
import { useGetUrlIDs } from "../../../../../../slices/getters/stateSliceGetters";

interface AddCardTagFormProps {
  cardTags: CardTag[];
}

const AddCardTagForm: React.FC<AddCardTagFormProps> = (
  props: AddCardTagFormProps
) => {
  const dispatch = useAppDispatch();
  const { cardTags } = props;

  const [newCardTag, setNewCardTag] = useState<string>("");

  const { projectID, boardID, cardID } = useGetUrlIDs();

  const handleAddCardTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      handleCardTag({
        type: "add",
        cardTagTitle: newCardTag,
        idPaths: {
          projectID: projectID,
          boardID: boardID,
          cardID: cardID,
        },
      })
    );

    console.log(cardID);

    setNewCardTag("");
  };

  const handleDeleteCardTag = (cardTagID: number) => {
    dispatch(
      handleCardTag({
        type: "delete",
        cardTagID: cardTagID,
        idPaths: {
          projectID: projectID,
          boardID: boardID,
          cardID: cardID,
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
            color='primary'
            onDelete={() => handleDeleteCardTag(cardTag.cardTagID)}
            key={cardTag.cardTagID}
          />
        ))}
      </div>

      <form className='add-card-tag' onSubmit={handleAddCardTag}>
        <div className='header3'>Add Card Tag</div>

        <TextField
          variant='outlined'
          label='Add card tag (Max of 30 characters)'
          value={newCardTag}
          inputProps={{
            maxLength: 30,
          }}
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
