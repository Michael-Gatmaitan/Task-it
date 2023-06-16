import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteProject, logoutUser } from "../../slices/userSlice";
import { RootState } from "../../app/store";
import type { Project } from "../../app/types";

// Modal
import CreateProjectModal from "./modals/CreateProjectModal";

import "../styles/Projects.css";

// MUI components
import { Button } from "@mui/material";

const Projects: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects: Project[] = useAppSelector(
    (state: RootState) => state.userReducer.activeUser.projects
  );

  const [showCreateProjectModal, setShowCreateProjectModal] =
    useState<boolean>(false);

  const showModal = () => {
    setShowCreateProjectModal(true);
  };

  return (
    <div className='projects page'>
      <div className='page-header'>
        <div className='page-title header2'>
          Projects {projects.length && " 0"}
        </div>

        {/* <button
          className='create-new-project default-button bordered-button'
          onClick={showModal}
        >
          Create new project 
        </button>*/}

        <Button variant='outlined' onClick={showModal}>
          Create new project
        </Button>
        <Button variant='contained'>Create new project</Button>
      </div>

      {projects !== undefined
        ? projects.map((project, i) => (
            <div key={i}>
              <div>{project.projectTitle}</div>
              <div>{project.projectDescription}</div>

              <Button
                variant='contained'
                onClick={() => dispatch(deleteProject(project))}
              >
                Delete project
              </Button>
            </div>
          ))
        : null}

      <Button
        variant='outlined'
        color='error'
        onClick={() => dispatch(logoutUser())}
      >
        Log out
      </Button>

      {showCreateProjectModal ? (
        <CreateProjectModal
          showCreateProjectModal={showCreateProjectModal}
          setShowCreateProjectModal={setShowCreateProjectModal}
        />
      ) : null}
    </div>
  );
};

export default Projects;
