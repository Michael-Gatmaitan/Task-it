import React, { useState, Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import { titleChanger } from "../../app/titleChanger";
import { useAppSelector } from "../../app/hooks";

import { RootState } from "../../app/store";

// types
import type { Project as ProjectType } from "../../types/types";

import "../styles/Projects.css";

// MUI components
import { Button, Tooltip } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import EditProjectModal from "./modals/EditProjectModal";
import CustomStyledSkeleton from "../CustomStyledSkeleton";

const ProjectCard = React.lazy(() => import("./projects/ProjectCard"));

const Projects: React.FC = () => {
  titleChanger({ title: "Projects" });

  const projects: ProjectType[] = useAppSelector(
    (state: RootState) => state.userReducer.activeUser.projects
  );

  const [showEditProjectModal, setShowEditProjectModal] =
    useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectType | undefined>();

  return (
    <div className='projects page'>
      <div className='projects-page-nav'>
        <div className='projects-page-title header2'>
          Projects{" "}
          {projects.length ? (
            <span className='projects-length'>{projects.length}</span>
          ) : (
            ""
          )}
        </div>

        <Tooltip title='Add project' placement='top'>
          <Link to='create'>
            <Button variant='outlined' className='create-new-project'>
              <AddCircleRounded />
              <span className='button-text'>Create new project</span>
            </Button>
          </Link>
        </Tooltip>
      </div>

      {projects.length !== 0 ? (
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
      ) : (
        <div className='label'>No project was found.</div>
      )}

      {/* {showCreateProjectModal ? (
        <CreateProjectModal
          setShowCreateProjectModal={setShowCreateProjectModal}
        />
      ) : null} */}

      {showEditProjectModal ? (
        <EditProjectModal
          setProjectToEdit={setProjectToEdit}
          projectToEdit={projectToEdit}
          setShowEditProjectModal={setShowEditProjectModal}
        />
      ) : null}

      <Outlet />
    </div>
  );
};

export default Projects;
