import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addProject, deleteProject } from "../../slices/userSlice";
import { RootState } from "../../app/store";
import type { Project } from "../../app/types";

import "../styles/Projects.css";

const Projects: React.FC = () => {
  const dispatch = useAppDispatch();

  const projects: Project[] = useAppSelector(
    (state: RootState) => state.userReducer.activeUser.projects
  );

  return (
    <div className='projects page'>
      <div className='page-header'>
        <div className='page-title header2'>Projects {projects.length}</div>

        <button className='create-new-project default-button bordered-button'>
          Create new project
        </button>
      </div>
      {projects !== undefined
        ? projects.map((project, i) => (
            <div key={i}>
              <div>{project.projectTitle}</div>
              <div>{project.dateCreated}</div>

              <button
                className='default-button'
                onClick={() => dispatch(deleteProject(project))}
              >
                Delete project
              </button>
            </div>
          ))
        : null}

      <button
        className='default-button bordered-button'
        onClick={() => dispatch(addProject())}
      >
        Add project
      </button>

      <CreateProjectModal />
    </div>
  );
};

const CreateProjectModal: React.FC = () => {
  return (
    <div className='create=project-modal bordered-container'>
      Create Project
    </div>
  );
};

export default Projects;
