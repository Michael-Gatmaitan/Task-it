import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProject } from "../../../slices/userSlice";
import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material";
import type { Project as ProjectType } from "../../../types/types";
import { useAppDispatch } from "../../../app/hooks";
import DeleteModal from "../modals/DeleteModal";

import { Button, Chip } from "@mui/material";
import { TaskAltRounded } from "@mui/icons-material";
import "../../styles/projects/ProjectCard.css";

interface ProjectProps {
  project: ProjectType;
  setProjectToEdit: React.Dispatch<
    React.SetStateAction<ProjectType | undefined>
  >;
  setShowEditProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectCard: React.FC<ProjectProps> = (props: ProjectProps) => {
  const dispatch = useAppDispatch();
  const [toggleOptions, setToggleOptions] = useState<boolean>(false);

  const { project, setProjectToEdit, setShowEditProjectModal } = props;

  const [showDeleteProject, setShowDeleteProject] = useState<boolean>(false);
  const deleteProjectFunc = () => dispatch(deleteProject(project));

  return (
    <div className='project-card bordered-container'>
      <DeleteModal
        showDeleteModal={showDeleteProject}
        setShowDeleteModal={setShowDeleteProject}
        onDeleteFunction={deleteProjectFunc}
        componentNameToDelete='Project'
      />

      {toggleOptions ? (
        <div className='project-options'>
          <div className='options-container'>
            <Link to={`${project.projectID}`}>
              <Button variant='text'>Open</Button>
            </Link>
            <Button
              variant='text'
              onClick={() => {
                setProjectToEdit(project);
                setShowEditProjectModal(true);
              }}
            >
              Edit
            </Button>
            {/* <Button variant='text' onClick={() => console.log("Move to done")}>
              Move to "Done"
            </Button> */}
            <Button
              variant='text'
              className='delete-project'
              onClick={() => {
                setShowDeleteProject(true);
                setToggleOptions(!toggleOptions);
              }}
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

      {/* Project main contents */}
      <div className='project-contents'>
        <div className='project-header'>
          <div className='header3 project-title'>{project.projectTitle}</div>
          {/* possibly more information about this project */}
        </div>

        <div className='project-tags'>
          <div className='tags-container'>
            {project.tags !== undefined
              ? project.tags.map((tag, i) => (
                  <Chip color='primary' label={tag} key={i} />
                ))
              : null}
          </div>
        </div>

        <ProjectProgress project={project} />
      </div>
      {/* <div>{project.projectDescription}</div> */}
    </div>
  );
};

interface ProjectProgressProps {
  project: ProjectType;
}

const ProjectProgress: React.FC<ProjectProgressProps> = (
  props: ProjectProgressProps
) => {
  const { project } = props;
  const { completedTodos, totalTodos } = project;

  const eitherAreZero = totalTodos === 0 || completedTodos === 0;
  const todoPercentage = eitherAreZero
    ? `0%`
    : `${Math.round((completedTodos / totalTodos) * 100)}%`;

  return (
    <div className='project-progress'>
      <TaskAltRounded />

      <div className='progress-info label'>
        <div className='project-tasks'>
          {completedTodos}/{totalTodos}
        </div>

        <div className='progress-bar'>
          <div className='progress-hand' style={{ width: todoPercentage }} />
        </div>

        <div className='progress-percent label'>{todoPercentage}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
