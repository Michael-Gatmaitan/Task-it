import React, { useEffect, useState, Suspense, useMemo } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { getActiveUser } from "../../../slices/userSlice";
import { Project as ProjectType } from "../../../types/types";

import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Button, Skeleton } from "@mui/material";

// dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "../../styles/projects/Project.css";
import CustomStyledSkeleton from "../../CustomStyledSkeleton";

// Code splitting
const BoardMaker = React.lazy(() => import("./BoardMaker"));
const Board = React.lazy(() => import("./boards/Board"));

// This is a Project page

type ProjectRouteParams = {
  projectID: string;
};

const Project: React.FC = () => {
  const { projectID } = useParams<ProjectRouteParams>();

  dayjs.extend(relativeTime);

  const navigate = useNavigate();

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

  const [time, setTime] = useState<string>("");
  const [showBoardMaker, setShowBoardMaker] = useState<boolean>(false);

  useEffect(() => {
    if (currentProject !== undefined)
      setTime(dayjs(currentProject.dateCreated).fromNow());
  }, [currentProject]);

  return currentProject !== undefined ? (
    <div className='project page'>
      <div className='project-nav'>
        <div className='bordered-container arrow-back-nav'>
          <ArrowBackIosNewRounded
            onClick={() => navigate(`/${userID}/projects`)}
            fontSize='small'
          />
        </div>

        <div className='header2'>
          {currentProject.projectTitle || "Loading"}
        </div>

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
                fallback={<CustomStyledSkeleton componentName='board-card' />}
              >
                <Board board={board} />
              </Suspense>
            ))
          : null}

        {/* This shows up if user wants to create board */}
        {showBoardMaker ? (
          <Suspense
            fallback={
              <Skeleton
                className='skeleton-board'
                variant='rounded'
                width={200}
                height={180}
              />
            }
          >
            <BoardMaker setShowBoardMaker={setShowBoardMaker} />
          </Suspense>
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

      <Outlet />
    </div>
  ) : null;
};

export default Project;
