import React, { useRef, useEffect, useState, lazy, Suspense } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import {
  deleteBoard,
  editBoardTitleOnBlur,
} from "../../../../slices/userSlice";

import type { Board as BoardType } from "../../../../types/types";
import { Button } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";

import CardMaker from "./CardMaker";
import CustomStyledSkeleton from "../../../CustomStyledSkeleton";
import BoardOptions from "./BoardOptions";
import DeleteModal from "../../modals/DeleteModal";

import { motion, Variants } from "framer-motion";

import "../../../styles/projects/boards/Board.css";

const Card = lazy(() => import("./cards/Card"));

interface BoardProps {
  board: BoardType;
  projectID: number;
  variantItem: Variants;
}

const Board: React.FC<BoardProps> = (props) => {
  const { board, projectID, variantItem } = props;

  const dispatch = useAppDispatch();

  const [newBoardTitle, setNewBoardTitle] = useState<string>(board.boardTitle);

  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log("TItle changed ort board moved");
    if (titleRef.current !== null) titleRef.current.value = board.boardTitle;
  }, [board.boardTitle]);

  const boardTitleOnBlur = () => {
    console.log(`State: ${newBoardTitle}, Redux: ${board.boardTitle}`);

    const editBoardReducerArgs = {
      currentTitle: board.boardTitle,
      newBoardTitle: newBoardTitle,
      projectID: projectID,
      boardID: board.boardID,
    };

    dispatch(editBoardTitleOnBlur(editBoardReducerArgs));
  };

  const [showCardMaker, setShowCardMaker] = useState<boolean>(false);

  const [showBoardOptions, setShowBoardOptions] = useState<boolean>(false);

  const [showDeleteBoard, setShowDeleteBoard] = useState<boolean>(false);
  const deleteBoardFunc = () => dispatch(deleteBoard({ projectID, board }));

  return (
    <motion.div variants={variantItem} className='board bordered-container'>
      <DeleteModal
        showDeleteModal={showDeleteBoard}
        setShowDeleteModal={setShowDeleteBoard}
        onDeleteFunction={deleteBoardFunc}
        componentNameToDelete='Board'
      />

      {showBoardOptions ? (
        <BoardOptions
          setShowBoardOptions={setShowBoardOptions}
          setShowDeleteBoard={setShowDeleteBoard}
          boardID={board.boardID}
          projectID={projectID}
        />
      ) : null}

      <div className='board-nav'>
        <div className='board-title-container'>
          <input
            ref={titleRef}
            type='text'
            name='boardTitle'
            className='header3 editable-board-title'
            value={newBoardTitle}
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
    </motion.div>
  );
};

export default Board;
