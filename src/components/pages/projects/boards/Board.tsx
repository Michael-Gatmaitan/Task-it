import React, { useState, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { editBoardTitleOnBlur } from "../../../../slices/userSlice";
import type { Board as BoardType } from "../../../../types/types";
import { Button } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";

import CardMaker from "./CardMaker";
import "../../../styles/projects/boards/Board.css";
import CustomStyledSkeleton from "../../../CustomStyledSkeleton";

const Card = lazy(() => import("./cards/Card"));

interface BoardProps {
  board: BoardType;
}

type ParamsType = {
  projectID?: string | undefined;
};

const Board: React.FC<BoardProps> = (props) => {
  const { board } = props;
  const dispatch = useAppDispatch();
  const params: ParamsType = useParams();

  const [newBoardTitle, setNewBoardTitle] = useState<string>("");
  const boardTitleOnBlur = () => {
    const { projectID } = params;

    const projectID_reducerArg: number = projectID ? parseInt(projectID) : -1;

    const editBoardReducerArgs = {
      currentTitle: board.boardTitle,
      newBoardTitle: newBoardTitle,
      projectID: projectID_reducerArg,
      boardID: board.boardID,
    };

    dispatch(editBoardTitleOnBlur(editBoardReducerArgs));
  };

  const [showCardMaker, setShowCardMaker] = useState<boolean>(false);

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
            onChange={(e) => setNewBoardTitle(e.target.value)}
          />
        </div>

        <div className='board-options'>
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
              <Link to={`boards/${board.boardID}/cards/${card.cardID}`}>
                <Card card={card} />
              </Link>
            </Suspense>
          ))
        )}
      </div>

      {/* This is a board!!!! */}

      {showCardMaker ? (
        <CardMaker
          projectID={
            params.projectID !== undefined ? parseInt(params.projectID) : -1
          }
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
