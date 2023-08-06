import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getUrlIDs } from "../../../../slices/stateSlice";
import { moveBoard } from "../../../../slices/userSlice";

import "../../../styles/projects/boards/BoardOptions.css";

interface BoardOptionsProps {
  setShowBoardOptions: React.Dispatch<React.SetStateAction<boolean>>;
  boardID: number;
}

const BoardOptions: React.FC<BoardOptionsProps> = (
  props: BoardOptionsProps
) => {
  const { setShowBoardOptions, boardID } = props;

  useEffect(() => {
    const handleEscapeKeyEvent = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === "Escape") setShowBoardOptions(false);
    };

    window.addEventListener("keydown", handleEscapeKeyEvent);

    return () => window.removeEventListener("keydown", handleEscapeKeyEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='board-options' onClick={() => setShowBoardOptions(false)}>
      <DirectionButtons boardID={boardID} />

      <div className='action-buttons' onClick={(e) => e.stopPropagation()}>
        <Button variant='contained' color='error'>
          Delete board
        </Button>
        <Button variant='contained' color='error'>
          Close
        </Button>
      </div>
    </div>
  );
};

interface DirButProps {
  boardID: number;
}

const DirectionButtons: React.FC<DirButProps> = (props: DirButProps) => {
  const dispatch = useAppDispatch();
  const { boardID } = props;
  const { projectID } = useAppSelector(getUrlIDs);

  const handleMoveBoard = (direction: "left" | "right") => {
    dispatch(moveBoard({ projectID, boardID, direction }));
  };

  return (
    <div className='direction-buttons' onClick={(e) => e.stopPropagation()}>
      <Button variant='contained' onClick={() => handleMoveBoard("left")}>
        left
      </Button>
      <Button variant='contained' onClick={() => handleMoveBoard("right")}>
        right
      </Button>
    </div>
  );
};

export default BoardOptions;
