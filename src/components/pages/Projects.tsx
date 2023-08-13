import React, { useState, Suspense, lazy } from "react";
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

// Framer motion
import { motion } from "framer-motion";
import {
  staggerAnimation,
  variantsForPages,
} from "../../framer-motion-variants";
import CreateProjectModal from "./modals/CreateProjectModal";

const ProjectCard = lazy(() => import("./projects/projectCard/ProjectCard"));

const Projects: React.FC = () => {
  titleChanger({ title: "Projects" });

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
    <motion.div className='projects page' {...variantsForPages}>
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
          <Button
            variant='outlined'
            className='create-new-project'
            onClick={showModal}
          >
            <AddCircleRounded />
            <span className='button-text'>Create new project</span>
          </Button>
        </Tooltip>
      </div>

      {projects.length !== 0 ? (
        <motion.div
          variants={staggerAnimation.container}
          initial='hidden'
          animate='show'
          className='projects-container'
        >
          {projects !== undefined
            ? projects.map((project, i) => (
                <Suspense
                  key={i}
                  fallback={<CustomStyledSkeleton componentName='project' />}
                >
                  <ProjectCard
                    project={project}
                    setProjectToEdit={setProjectToEdit}
                    setShowEditProjectModal={setShowEditProjectModal}
                    variantItem={staggerAnimation.item}
                  />
                </Suspense>
              ))
            : null}
        </motion.div>
      ) : (
        <div className='label'>No project was found.</div>
      )}

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

      {/* <Outlet /> */}
    </motion.div>
  );
};

export default Projects;
