import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../../app/hooks";
import { CloseRounded, EditRounded, DeleteRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { editCardProperties } from "../../../../../../slices/userSlice";

interface SelectedCardNavProps {
  cardTitle: string;
  cardDescription: string;
  activeUserID: number;
  projectID: string;
  boardID: string;
  cardID: string;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectedCardNav: React.FC<SelectedCardNavProps> = (
  props: SelectedCardNavProps
) => {
  const {
    cardTitle,
    cardDescription,
    activeUserID,
    projectID,
    boardID,
    cardID,
    setShowDeleteModal,
  } = props;
  const navigate = useNavigate();

  const [showEditCardTitle, setShowEditCardTitle] = useState<boolean>(false);
  const [showEditCardDescription, setShowEditCardDescription] =
    useState<boolean>(false);

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
            onClick={() =>
              navigate(`/${activeUserID}/projects/${parseInt(projectID)}`)
            }
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
    </>
  );
};

interface CardTitleProps {
  cardTitle: string;
  showEditCardTitle: boolean;
  setShowEditCardTitle: React.Dispatch<React.SetStateAction<boolean>>;
  projectID: string;
  boardID: string;
  cardID: string;
}

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
        className='header2'
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
  projectID: string;
  boardID: string;
  cardID: string;
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

  const [initialDes, setInitialDes] = useState<string>(cardDescription);

  return showEditCardDescription ? (
    <div
      className='card-description body-text'
      onClick={() => setShowEditCardDescription((p) => !p)}
    >
      {cardDescription === "" ? "No card description." : cardDescription}
    </div>
  ) : (
    <textarea
      className='card-description body-text'
      onClick={() => setShowEditCardDescription((p) => !p)}
      value={initialDes === "" ? "No card description." : initialDes}
      onChange={(e) => setInitialDes(e.target.value)}
    />
  );
};

export default SelectedCardNav;
