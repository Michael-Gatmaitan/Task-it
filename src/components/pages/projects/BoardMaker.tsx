import React, { useState, useDeferredValue } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { addBoard } from "../../../slices/userSlice";
import { Button, TextField } from "@mui/material";

interface BoardMakerProps {
  setShowBoardMaker: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardMaker: React.FC<BoardMakerProps> = (props: BoardMakerProps) => {
  const dispatch = useAppDispatch();
  const { setShowBoardMaker } = props;
  const params = useParams();

  const [boardTitle, setBoardTitle] = useState<string>("");
  const deferredBoardTitle = useDeferredValue(boardTitle);

  const handleSubmitAddBoard = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();

    const projectID =
      params.projectID === undefined ? -1 : parseInt(params.projectID);

    console.log(
      "Creating board with arguments of:",
      deferredBoardTitle,
      params.projectID
    );
    dispatch(
      addBoard({
        boardTitle: deferredBoardTitle,
        projectID: projectID,
      })
    );

    // Close the board maker modal
    setShowBoardMaker(false);
  };

  return (
    <div className='board-maker bordered-container'>
      <div className="header2">Create board</div>
      <form id='board-maker' onSubmit={handleSubmitAddBoard}>
        <TextField
          autoFocus
          label='Board title'
          variant='outlined'
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          onBlur={() => setShowBoardMaker(false)}
        />

        <div className='board-maker-buttons'>
          <Button
            disabled={deferredBoardTitle.trim() === ""}
            type='submit'
            variant='contained'
            onMouseDown={handleSubmitAddBoard}
          >
            Create
          </Button>
          <Button variant='outlined' onClick={() => setShowBoardMaker(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BoardMaker;
