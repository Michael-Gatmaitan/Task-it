import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProject } from "../../../slices/userSlice";
import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material";
import type { Project as ProjectType } from "../../../app/types";
import { useAppDispatch } from "../../../app/hooks";

import { Button, Chip } from "@mui/material";
import { TaskAltRounded } from "@mui/icons-material";

interface ProjectProps {
  project: ProjectType;
  setProjectToEdit: React.Dispatch<
    React.SetStateAction<ProjectType | undefined>
  >;
}

const ProjectCard: React.FC<ProjectProps> = (props: ProjectProps) => {
  const dispatch = useAppDispatch();
  const [toggleOptions, setToggleOptions] = useState<boolean>(false);

  const { project, setProjectToEdit } = props;

  return (
    <div className='project-card bordered-container'>
      {toggleOptions ? (
        <div className='project-options'>
          <div className='options-container'>
            <Link to={`${project.id}`}>
              <Button variant='text' onClick={() => console.log("")}>
                Open
              </Button>
            </Link>
            <Button variant='text' onClick={() => setProjectToEdit(project)}>
              Edit
            </Button>
            <Button variant='text' onClick={() => console.log("Move to done")}>
              Move to "Done"
            </Button>
            <Button
              variant='text'
              className='delete-project'
              onClick={() => {
                dispatch(deleteProject(project));
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

        <div className='project-progress'>
          <TaskAltRounded />

          <div className='progress-info label'>
            <div className='project-tasks'>
              {/* ${taskDone} / ${totalTask} */}
              10/20
            </div>

            <div className='progress-bar'>
              <div className='progress-hand' style={{ width: "50%" }} />
            </div>

            <div className='progress-percent label'>
              {/* ${taskDone} / ${totalTask} * 100 */}
              50%
            </div>
          </div>
        </div>
      </div>
      {/* <div>{project.projectDescription}</div> */}
    </div>
  );
};

export default ProjectCard;
