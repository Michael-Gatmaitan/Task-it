import React, { useEffect, useState, useDeferredValue } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { addBoard, getActiveUser } from "../../../slices/userSlice";
import { Project as ProjectType } from "../../../app/types";

import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";

import Board from "./boards/Board";

// dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "../../styles/projects/Project.css";

// This is a Project page

type ProjectRouteParams = {
  projectID: string;
};

const Project: React.FC = () => {
  const { projectID } = useParams<ProjectRouteParams>();

  dayjs.extend(relativeTime);

  const navigate = useNavigate();

  const activeUser = useAppSelector(getActiveUser);

  const currentProject: ProjectType | undefined =
    projectID !== undefined
      ? activeUser.projects.find(
          (project) => project.projectID === parseInt(projectID)
        )
      : undefined;

  useEffect(() => {
    if (currentProject !== undefined)
      setTime(dayjs(currentProject.dateCreated).fromNow());
  }, [currentProject]);

  const [time, setTime] = useState<string>("");
  const [showBoardMaker, setShowBoardMaker] = useState<boolean>(false);

  return currentProject !== undefined ? (
    <div className='project page'>
      <div className='project-nav'>
        <ArrowBackIosNewRounded
          onClick={() => navigate(`/${activeUser.userID}/projects`)}
        />
        <div className='header2'>
          {currentProject.projectTitle || "Loading"}
        </div>

        <div className='date-created header3'>{time}</div>
      </div>

      <div
        className='boards-container'
        style={{
          gridTemplateColumns: `repeat(${
            currentProject.boards.length + 1 + (showBoardMaker ? 1 : 0)
          }, min-content)`,
        }}
      >
        {/* If there no board and board-maker is off, show this */}
        {currentProject.boards.length === 0 && !showBoardMaker ? (
          <div>There</div>
        ) : (
          currentProject.boards.map((board, i) => (
            <Board board={board} key={i} />
          ))
        )}

        {/* This shows up if user wants to create board */}
        {showBoardMaker ? (
          <BoardMaker setShowBoardMaker={setShowBoardMaker} />
        ) : (
          <Button
            variant='contained'
            className='add-board'
            onClick={() => {
              setShowBoardMaker((prev) => !prev);

              setTimeout(() => {
                const boardsContainer = document.getElementsByClassName(
                  "boards-container"
                )[0] as HTMLDivElement;

                boardsContainer.scrollLeft = boardsContainer.scrollWidth;
              }, 50);
            }}
          >
            Add Board
          </Button>
        )}
      </div>
    </div>
  ) : null;
};

interface BoardMakerProps {
  setShowBoardMaker: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardMaker: React.FC<BoardMakerProps> = (props: BoardMakerProps) => {
  const dispatch = useAppDispatch();
  const { setShowBoardMaker } = props;

  const location = useLocation();
  const params = useParams();

  const [boardTitle, setBoardTitle] = useState<string>("");
  const deferredBoardTitle = useDeferredValue(boardTitle);

  const handleSubmitAddBoard = (e: React.FormEvent<HTMLFormElement>) => {
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
  };

  useEffect(() => {
    console.log(location, params);
  }, [location, params]);

  useEffect(() => console.log(deferredBoardTitle), [deferredBoardTitle]);

  return (
    <div className='board-maker bordered-container'>
      <form id='board-maker' onSubmit={handleSubmitAddBoard}>
        <TextField
          label='Board title'
          variant='outlined'
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />

        <div className='board-maker-buttons'>
          <Button
            disabled={deferredBoardTitle.trim() === ""}
            type='submit'
            variant='contained'
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

export default Project;
