import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { getActiveUser } from "../../../slices/userSlice";
import { Project as ProjectType } from "../../../app/types";

import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Button } from "@mui/material";

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

  const curProject: ProjectType | undefined =
    projectID !== undefined
      ? activeUser.projects.find(
          (project) => project.id === parseInt(projectID)
        )
      : undefined;

  useEffect(() => {
    if (curProject !== undefined)
      setTime(dayjs(curProject.dateCreated).fromNow());
  }, [curProject]);

  const [time, setTime] = useState<string>("");
  const [showAddBoard, setShowAddBoard] = useState<boolean>(false);

  return curProject !== undefined ? (
    <div className='project page'>
      <div className='project-nav'>
        <ArrowBackIosNewRounded
          onClick={() => navigate(`/${activeUser.userID}/projects`)}
        />
        <div className='header2'>{curProject.projectTitle || "Loading"}</div>

        <div className='date-created header3'>{time}</div>
      </div>

      <div
        className='boards-container'
        style={{
          gridTemplateColumns: `repeat(${curProject.boards.length + 1}, auto)`,
        }}
      >
        {curProject.boards.map((board, i) => (
          <div className='board bordered-container' key={i}>
            board {board.boardTitle}
          </div>
        ))}

        <Button
          variant='contained'
          className='add-board'
          onClick={() => setShowAddBoard((prevState) => !prevState)}
        >
          Add Board {showAddBoard ? "true" : "false"}
        </Button>
      </div>
    </div>
  ) : null;
};

export default Project;
