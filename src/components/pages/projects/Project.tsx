import React, { useEffect, useState, Suspense, useMemo, lazy } from "react";
import { titleChanger } from "../../../app/titleChanger";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { getActiveUser } from "../../../slices/userSlice";
import { Project as ProjectType } from "../../../types/types";

import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";

// dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "../../styles/projects/Project.css";
import CustomStyledSkeleton from "../../CustomStyledSkeleton";

// Framer motion
import { motion } from "framer-motion";
import { variantsForPages } from "../../../framer-motion-variants";

// State reducers
import { getShowSelectedCard } from "../../../slices/stateSlice";

// Code splitting
const BoardMaker = lazy(() => import("./BoardMaker"));
const Board = lazy(() => import("./boards/Board"));
const SelectedCardModal = lazy(
  () => import("./boards/cards/card-modal/SelectedCardModal")
);

// This is a Project page

type ProjectRouteParams = {
  projectID: string;
};

const Project: React.FC = () => {
  const params = useParams<ProjectRouteParams>();
  const { projectID } = params;

  dayjs.extend(relativeTime);

  const { projects: userProjects, userID } = useAppSelector(getActiveUser);

  const currentProject: ProjectType | undefined = useMemo(
    () =>
      projectID !== undefined
        ? userProjects.find(
            (project: ProjectType) => project.projectID === parseInt(projectID)
          )
        : undefined,
    [userProjects, projectID]
  );

  const showBoardMakerFunc = () => {
    setShowBoardMaker((prev) => !prev);

    const timeout = setTimeout(() => {
      const boardsContainer = document.getElementsByClassName(
        "boards-container"
      )[0] as HTMLDivElement;

      boardsContainer.scrollLeft = boardsContainer.scrollWidth;
    }, 50);

    return () => clearTimeout(timeout);
  };

  // Title changer
  useEffect(() => {
    if (currentProject !== undefined)
      titleChanger({ projectTitle: currentProject.projectTitle });
  }, [currentProject, params]);

  // Set project time created.
  useEffect(() => {
    if (currentProject !== undefined)
      setTime(dayjs(currentProject.dateCreated).fromNow());
  }, [currentProject]);

  const [time, setTime] = useState<string>("");
  const [showBoardMaker, setShowBoardMaker] = useState<boolean>(false);

  const showSelectedCard = useAppSelector(getShowSelectedCard);

  return currentProject !== undefined ? (
    <motion.div className='project page' {...variantsForPages}>
      <div className='project-nav'>
        <Link
          to={`/${userID}/projects`}
          className='bordered-container arrow-back-nav'
        >
          <ArrowBackIosNewRounded fontSize='small' />
        </Link>

        <Tooltip title={currentProject.projectTitle} placement='top-start'>
          <div className='header2'>
            {currentProject.projectTitle || "Loading"}
          </div>
        </Tooltip>

        <div className='date-created card-title'>{time}</div>
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
        {currentProject.boards.length !== 0
          ? currentProject.boards.map((board, i) => (
              <Suspense
                key={i}
                fallback={<CustomStyledSkeleton componentName='board' />}
              >
                <Board board={board} />
              </Suspense>
            ))
          : null}

        {/* This shows up if user wants to create board */}
        {showBoardMaker ? (
          <Suspense
            fallback={<CustomStyledSkeleton componentName='board-maker' />}
          >
            <BoardMaker setShowBoardMaker={setShowBoardMaker} />
          </Suspense>
        ) : (
          <Button
            variant='contained'
            className='add-board'
            onClick={showBoardMakerFunc}
          >
            Add Board
          </Button>
        )}
      </div>

      {showSelectedCard ? (
        <Suspense fallback={<div>HAHA</div>}>
          <SelectedCardModal />
        </Suspense>
      ) : null}
    </motion.div>
  ) : null;
};

export default Project;
