import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CloseRounded, EditRounded, DeleteRounded } from "@mui/icons-material";

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

  const cardTitleRef = useRef<HTMLInputElement | null>(null);

  const handleEditCardTitle = () => {
    if (cardTitleRef.current !== null) {
      console.log(cardTitleRef.current.value);
    }
  };

  const [newTitle, setNewTitle] = useState<string>(cardTitle);

  return (
    <div className='selected-card-nav'>
      <div className='selected-card-header'>
        <div className='header2'>{cardTitle}</div>
        <form onSubmit={handleEditCardTitle}>
          <input
            ref={cardTitleRef}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </form>

        <div className='edit-card-title'>
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

export default SelectedCardNav;
