import React, { useState, Suspense } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser } from "../../slices/userSlice";
import { RootState } from "../../app/store";

// types
import type { Project as ProjectType } from "../../types/types";

import "../styles/Projects.css";

// Modal
import CreateProjectModal from "./modals/CreateProjectModal";

// MUI components
import { Button } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import EditProjectModal from "./modals/EditProjectModal";
import CustomStyledSkeleton from "../CustomStyledSkeleton";

const ProjectCard = React.lazy(() => import("./projects/ProjectCard"));

const Projects: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects: ProjectType[] = useAppSelector(
    (state: RootState) => state.userReducer.activeUser.projects
  );

  const [showCreateProjectModal, setShowCreateProjectModal] =
    useState<boolean>(false);

  const [showEditProjectModal, setShowEditProjectModal] =
    useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectType | undefined>();

  const showModal = () => setShowCreateProjectModal(true);

  return (
    <div className='projects page'>
      <div className='projects-page-nav'>
        <div className='projects-page-title header2'>
          Projects{" "}
          {projects.length ? (
            <span className='projects-length'>{projects.length}</span>
          ) : null}
        </div>

        <Button
          variant='outlined'
          onClick={showModal}
          className='create-new-project'
        >
          <AddCircleRounded />
          <span className='button-text'>Create new project</span>
        </Button>
      </div>

      <div className='projects-container'>
        {projects !== undefined
          ? projects.map((project, i) => (
              <Suspense
                fallback={<CustomStyledSkeleton componentName='project' />}
                key={i}
              >
                <ProjectCard
                  project={project}
                  setProjectToEdit={setProjectToEdit}
                  setShowEditProjectModal={setShowEditProjectModal}
                />
              </Suspense>
            ))
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
        <CreateProjectModal
          setShowCreateProjectModal={setShowCreateProjectModal}
        />
      ) : null}

      {showEditProjectModal ? (
        <EditProjectModal
          setProjectToEdit={setProjectToEdit}
          projectToEdit={projectToEdit}
          setShowEditProjectModal={setShowEditProjectModal}
        />
      ) : null}
    </div>
  );
};

export default Projects;
