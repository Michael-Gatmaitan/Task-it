import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteProject, logoutUser } from "../../slices/userSlice";
import { RootState } from "../../app/store";
import type { Project as ProjectType } from "../../app/types";

import { Outlet } from "react-router-dom";

// Modal
import CreateProjectModal from "./modals/CreateProjectModal";

import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material";

import "../styles/Projects.css";

// MUI components
import { Button } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import ModalContainer from "../ModalContainer";

const Projects: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects: ProjectType[] = useAppSelector(
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
        {/* <div className='page-title header2'>
          Projects {projects.length && " 0"}
        </div> */}

        <div className='page-title header2'>Di pa tapos, wag kang bidabida</div>

        <Button
          variant='outlined'
          onClick={showModal}
          className='create-new-project'
        >
          <AddCircleRounded />
          <span className='button-text'>Create new project</span>
        </Button>
      </div>

      {/* <Button
        variant='contained'
        onClick={() => dispatch(deleteProject(project))}
      >
        Delete project
      </Button> */}

      <div className='projects-container'>
        {projects !== undefined
          ? projects.map((project, i) => <Project project={project} key={i} />)
          : null}
      </div>

      <Button
        variant='outlined'
        color='error'
        onClick={() => dispatch(logoutUser())}
      >
        Log out
      </Button>
      {showCreateProjectModal ? (
        <ModalContainer
          showModal={showCreateProjectModal}
          setShowModal={setShowCreateProjectModal}
        >
          <CreateProjectModal
            showCreateProjectModal={showCreateProjectModal}
            setShowCreateProjectModal={setShowCreateProjectModal}
          />
        </ModalContainer>
      ) : null}

      <Outlet />
    </div>
  );
};

interface ProjectProps {
  project: ProjectType;
  key: number;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
  const dispatch = useAppDispatch();
  const [toggleOptions, setToggleOptions] = useState<boolean>(false);

  return (
    <div className='project-wrapper bordered-container'>
      {toggleOptions ? (
        <div className='project-options'>
          <div className='options-container'>
            <Button variant='text' onClick={() => console.log("")}>
              Open
            </Button>
            <Button variant='text' onClick={() => console.log("")}>
              Edit
            </Button>
            <Button variant='text' onClick={() => console.log("")}>
              Move to "Done"
            </Button>
            <Button
              variant='text'
              className='delete-project'
              onClick={() => dispatch(deleteProject(project))}
            >
              Delete
            </Button>
          </div>
        </div>
      ) : null}

      <div
        className='toggle-project-options'
        onClick={() => setToggleOptions(!toggleOptions)}
      >
        {toggleOptions ? (
          <ExpandLessRounded fontSize='large' />
        ) : (
          <ExpandMoreRounded fontSize='large' />
        )}
      </div>

      <div className='project-header'>
        <div className='header3 project-title'>{project.projectTitle}</div>
      </div>
      {/* <div>{project.projectDescription}</div> */}
    </div>
  );
};

export default Projects;
