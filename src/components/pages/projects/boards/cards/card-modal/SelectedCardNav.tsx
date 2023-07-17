import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../../../app/hooks";
import { CloseRounded, EditRounded, DeleteRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { editCardProperties } from "../../../../../../slices/userSlice";

interface SelectedCardNavProps {
  cardTitle: string;
  activeUserID: number;
  projectID: string;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectedCardNav: React.FC<SelectedCardNavProps> = (
  props: SelectedCardNavProps
) => {
  const { cardTitle, activeUserID, projectID, setShowDeleteModal } = props;
  const navigate = useNavigate();
  const [showEditCardTitle, setShowEditCardTitle] = useState<boolean>(false);

  return (
    <div className='selected-card-nav'>
      <div className='selected-card-header'>
        <CardTitle
          cardTitle={cardTitle}
          showEditCardTitle={showEditCardTitle}
          setShowEditCardTitle={setShowEditCardTitle}
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
  );
};

interface CardTitleProps {
  cardTitle: string;
  showEditCardTitle: boolean;
  setShowEditCardTitle: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardTitle: React.FC<CardTitleProps> = (props: CardTitleProps) => {
  const { cardTitle, showEditCardTitle, setShowEditCardTitle } = props;
  const dispatch = useAppDispatch();
  const { projectID, boardID, cardID } = useParams();

  const [newTitle, setNewTitle] = useState<string>(cardTitle);

  const dispatchEditCardProperties: VoidFunction = () => {
    if (
      projectID !== undefined &&
      boardID !== undefined &&
      cardID !== undefined
    ) {
      dispatch(
        editCardProperties({
          type: "card-title",
          value: newTitle,
          projectID,
          boardID,
          cardID,
        })
      );
    }
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
      <div className='header2' onClick={() => setShowEditCardTitle(true)}>
        {cardTitle}
      </div>
    </Tooltip>
  );
};

export default SelectedCardNav;
