import { FC, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import type { Project } from "../../../../types/types";
import "../../../styles/projects/projectCard/ProjectOptions.css";

type ReactSetStateType<T> = Dispatch<SetStateAction<T>>;

interface ProjectOptionsProps {
  project: Project;
  setShowDeleteProject: ReactSetStateType<boolean>;
  setToggleOptions: ReactSetStateType<boolean>;
  setShowEditProjectModal: ReactSetStateType<boolean>;
  setProjectToEdit: ReactSetStateType<Project | undefined>;
}

const ProjectOptions: FC<ProjectOptionsProps> = (
  props: ProjectOptionsProps
) => {
  const {
    project,
    setShowDeleteProject,
    setToggleOptions,
    setShowEditProjectModal,
    setProjectToEdit,
  } = props;

  return (
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
            setToggleOptions((prev) => !prev);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProjectOptions;
