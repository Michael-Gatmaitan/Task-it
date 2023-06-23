import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { getActiveUser } from "../../../slices/userSlice";

import { ArrowBackIosNewRounded } from "@mui/icons-material";

// import type { Project } from "../../../app/types";

type ProjectParams = {
  projectID: string;
};

const ProjectSelected: React.FC = () => {
  const { projectID } = useParams<ProjectParams>();
  const navigate = useNavigate();

  const activeUser = useAppSelector(getActiveUser);

  return (
    <div className='selected-project page'>
      <ArrowBackIosNewRounded
        onClick={() => navigate(`/u/${activeUser.userID}/projects`)}
      />
      <h1>
        {projectID !== undefined
          ? activeUser.projects.find(
              (project) => project.id === parseInt(projectID)
            )?.projectTitle
          : "und"}
      </h1>
    </div>
  );
};

export default ProjectSelected;
