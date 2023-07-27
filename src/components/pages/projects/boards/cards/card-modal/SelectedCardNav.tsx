import React, { useState } from "react";
import { useAppDispatch } from "../../../../../../app/hooks";
import { CloseRounded, EditRounded, DeleteRounded } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { editCardProperties } from "../../../../../../slices/userSlice";
import { toggleShowSelectedCard } from "../../../../../../slices/stateSlice";

interface SelectedCardNavProps {
  cardTitle: string;
  cardDescription: string;
  projectID: number;
  boardID: number;
  cardID: number;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CardTitleProps {
  cardTitle: string;
  showEditCardTitle: boolean;
  setShowEditCardTitle: React.Dispatch<React.SetStateAction<boolean>>;
  projectID: number;
  boardID: number;
  cardID: number;
}

const SelectedCardNav: React.FC<SelectedCardNavProps> = (
  props: SelectedCardNavProps
) => {
  const dispatch = useAppDispatch();
  const {
    cardTitle,
    cardDescription,
    projectID,
    boardID,
    cardID,
    setShowDeleteModal,
  } = props;

  const [showEditCardTitle, setShowEditCardTitle] = useState<boolean>(false);
  const [showEditCardDescription, setShowEditCardDescription] =
    useState<boolean>(true);

  return (
    <>
      <div className='selected-card-nav'>
        <div className='selected-card-header'>
          <CardTitle
            cardTitle={cardTitle}
            showEditCardTitle={showEditCardTitle}
            setShowEditCardTitle={setShowEditCardTitle}
            projectID={projectID}
            boardID={boardID}
            cardID={cardID}
          />

          <div
            className='edit-card-title'
            onClick={() => setShowEditCardTitle((p) => !p)}
          >
            <EditRounded />
          </div>
        </div>

        <div className='card-modal-actions'>
          <div
            className='delete-card-modal'
            onClick={() => setShowDeleteModal((prev) => !prev)}
          >
            <DeleteRounded />
          </div>

          <div
            className='close-card-modal'
            onClick={() => dispatch(toggleShowSelectedCard())}
          >
            <CloseRounded fontSize='small' />
          </div>
        </div>
      </div>

      <CardDescription
        cardDescription={cardDescription}
        showEditCardDescription={showEditCardDescription}
        setShowEditCardDescription={setShowEditCardDescription}
        projectID={projectID}
        boardID={boardID}
        cardID={cardID}
      />

      <Button
        variant='contained'
        className='edit-card-description-button'
        onClick={() => setShowEditCardDescription(false)}
      >
        Edit card description
      </Button>
    </>
  );
};

const CardTitle: React.FC<CardTitleProps> = (props: CardTitleProps) => {
  const {
    cardTitle,
    showEditCardTitle,
    setShowEditCardTitle,
    projectID,
    boardID,
    cardID,
  } = props;
  const dispatch = useAppDispatch();

  const [newTitle, setNewTitle] = useState<string>(cardTitle);

  const dispatchEditCardProperties: VoidFunction = () => {
    dispatch(
      editCardProperties({
        editType: "card-title",
        value: newTitle,
        projectID,
        boardID,
        cardID,
      })
    );
    console.log("dispatchEditCardProperties() runned");
  };

  const handleSubmitOrBlurEditCardTitle = (
    e: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    console.log(e.type);
    if (e.type === "submit") e.preventDefault();
    setShowEditCardTitle(false);

    if (newTitle.trim() === cardTitle.trim()) return;

    if (newTitle.trim() === "") {
      setNewTitle(cardTitle);
      return;
    }

    dispatchEditCardProperties();
  };

  return showEditCardTitle ? (
    <form onSubmit={handleSubmitOrBlurEditCardTitle}>
      <input
        autoFocus
        value={newTitle}
        style={{ width: `${newTitle.length}ch` }}
        className='edit-card-title-input header2'
        onChange={(e) => setNewTitle(e.target.value)}
        onBlur={handleSubmitOrBlurEditCardTitle}
      />
    </form>
  ) : (
    <Tooltip title='Edit card title' placement='bottom-end'>
      <div
        className='card-title-input header2'
        onClick={() => setShowEditCardTitle(true)}
      >
        {cardTitle}
      </div>
    </Tooltip>
  );
};

interface CardDescriptionProps {
  cardDescription: string;
  showEditCardDescription: boolean;
  setShowEditCardDescription: React.Dispatch<React.SetStateAction<boolean>>;
  projectID: number;
  boardID: number;
  cardID: number;
}

const CardDescription: React.FC<CardDescriptionProps> = (
  props: CardDescriptionProps
) => {
  const {
    cardDescription,
    showEditCardDescription,
    setShowEditCardDescription,
    projectID,
    boardID,
    cardID,
  } = props;

  const dispatch = useAppDispatch();

  const [initialDes, setInitialDes] = useState<string>(cardDescription);

  const handleEditDescription = () => {
    setShowEditCardDescription(true);

    dispatch(
      editCardProperties({
        editType: "card-description",
        value: initialDes,
        projectID,
        boardID,
        cardID,
      })
    );
  };

  return showEditCardDescription ? (
    <div className='card-description body-text'>
      {cardDescription === "" ? "No Description" : cardDescription}
    </div>
  ) : (
    <textarea
      autoFocus
      className='edit-card-description-input body-text'
      // onClick={() => setShowEditCardDescription((p) => !p)}
      value={initialDes}
      style={{ overflow: "hidden" }}
      onChange={(e) => {
        e.target.style.height = "1px";
        e.target.style.height = `${25 + e.target.scrollHeight}px`;
        setInitialDes(`${e.target.value}`);
      }}
      onBlur={handleEditDescription}
    />
  );
};

export default SelectedCardNav;
