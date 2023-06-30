import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { editBoardTitleOnBlur } from "../../../../slices/userSlice";
import type { Board as BoardType } from "../../../../app/types";
// import { TextField } from "@mui/material";

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = (props) => {
  const { board } = props;
  const dispatch = useAppDispatch();
  const params = useParams();

  const [newTitle, setNewTitle] = useState<string>("");

  const boardTitleOnBlur = () => {
    const { projectID } = params;

    const projectID_reducerArg: number = projectID ? parseInt(projectID) : -1;

    const editBoardReducerArgs = {
      currentTitle: board.boardTitle,
      newBoardTitle: newTitle,
      projectID: projectID_reducerArg,
      boardID: board.boardID,
    };

    dispatch(editBoardTitleOnBlur(editBoardReducerArgs));
  };

  return (
    <div className='board bordered-container'>
      <div className='board-nav'>
        <div className='board-title-container'>
          <input
            type='text'
            name='boardTitle'
            className='header3 editable-board-title'
            defaultValue={board.boardTitle}
            id={`board-title-input-pID${params.projectID}-bID${board.boardID}`}
            onBlur={boardTitleOnBlur}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>

        <div className='board-options'></div>
      </div>
      {/* This is a board!!!! */}
    </div>
  );
};

export default Board;
