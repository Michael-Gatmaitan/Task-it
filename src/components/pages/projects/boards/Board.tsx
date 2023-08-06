import React, { useState, lazy, Suspense } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { editBoardTitleOnBlur } from "../../../../slices/userSlice";
import type { Board as BoardType } from "../../../../types/types";
import { Button } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";

import CardMaker from "./CardMaker";
import "../../../styles/projects/boards/Board.css";
import CustomStyledSkeleton from "../../../CustomStyledSkeleton";
import BoardOptions from "./BoardOptions";
import { getUrlIDs } from "../../../../slices/stateSlice";

const Card = lazy(() => import("./cards/Card"));

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = (props) => {
  const { board } = props;

  const dispatch = useAppDispatch();

  const ids = useAppSelector(getUrlIDs);
  const { projectID } = ids;

  const [newBoardTitle, setNewBoardTitle] = useState<string>("");
  const boardTitleOnBlur = () => {
    const editBoardReducerArgs = {
      currentTitle: board.boardTitle,
      newBoardTitle: newBoardTitle,
      projectID: ids.projectID,
      boardID: ids.boardID,
    };

    dispatch(editBoardTitleOnBlur(editBoardReducerArgs));
  };

  const [showCardMaker, setShowCardMaker] = useState<boolean>(false);

  const [showBoardOptions, setShowBoardOptions] = useState<boolean>(false);

  return (
    <div className='board bordered-container'>
      {showBoardOptions ? (
        <BoardOptions
          setShowBoardOptions={setShowBoardOptions}
          boardID={board.boardID}
        />
      ) : null}

      <div className='board-nav'>
        <div className='board-title-container'>
          <input
            type='text'
            name='boardTitle'
            className='header3 editable-board-title'
            value={board.boardTitle}
            id={`board-title-input-pID${projectID}-bID${board.boardID}`}
            onBlur={boardTitleOnBlur}
            onChange={(e) => setNewBoardTitle(e.target.value)}
          />
        </div>

        <div
          className='board-options-menu'
          onClick={() => setShowBoardOptions(true)}
        >
          <MenuRounded />
        </div>
      </div>

      <div className='cards-container'>
        {board.cards.length === 0 ? (
          <div className='label'>There's no card here.</div>
        ) : (
          board.cards.map((card, i) => (
            <Suspense
              fallback={<CustomStyledSkeleton componentName='card' />}
              key={i}
            >
              <Card card={card} boardID={board.boardID} cardID={card.cardID} />
            </Suspense>
          ))
        )}
      </div>

      {/* This is a board!!!! */}

      {showCardMaker ? (
        <CardMaker
          projectID={projectID}
          boardID={board.boardID}
          setShowCardMaker={setShowCardMaker}
        />
      ) : (
        <Button
          className='add-card-button'
          variant='contained'
          onClick={() => setShowCardMaker(true)}
        >
          Add card
        </Button>
      )}
    </div>
  );
};

export default Board;
