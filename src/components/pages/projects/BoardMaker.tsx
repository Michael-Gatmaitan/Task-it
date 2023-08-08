import React, { useState, useDeferredValue } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { addBoard } from "../../../slices/userSlice";
import { Button, TextField } from "@mui/material";
import { useGetUrlIDs } from "../../../slices/getters/stateSliceGetters";
import "../../styles/projects/BoardMaker.css";

interface BoardMakerProps {
  setShowBoardMaker: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardMaker: React.FC<BoardMakerProps> = (props: BoardMakerProps) => {
  const dispatch = useAppDispatch();
  const { setShowBoardMaker } = props;
  const { projectID } = useGetUrlIDs();

  const [boardTitle, setBoardTitle] = useState<string>("");
  const deferredBoardTitle = useDeferredValue(boardTitle);

  const handleSubmitAddBoard = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();

    console.log(
      "Creating board with arguments of:",
      deferredBoardTitle,
      projectID
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
      <div className='header2'>Create board</div>
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
