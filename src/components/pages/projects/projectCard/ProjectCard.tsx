import React, { useState } from "react";
import { deleteProject } from "../../../../slices/userSlice";
import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material";
import type { Project as ProjectType } from "../../../../types/types";
import { useAppDispatch } from "../../../../app/hooks";
import DeleteModal from "../../modals/DeleteModal";
import "../../../styles/projects/projectCard/ProjectCard.css";

// Framer motion
import { Variants, motion } from "framer-motion";
import ProjectCardContents from "./ProjectCardContents";
import ProjectOptions from "./ProjectOptions";

interface ProjectProps {
  project: ProjectType;
  setProjectToEdit: React.Dispatch<
    React.SetStateAction<ProjectType | undefined>
  >;
  setShowEditProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  variantItem: Variants;
}

const ProjectCard: React.FC<ProjectProps> = (props: ProjectProps) => {
  const dispatch = useAppDispatch();
  const [toggleOptions, setToggleOptions] = useState<boolean>(false);

  const { project, setProjectToEdit, setShowEditProjectModal, variantItem } =
    props;
  const [showDeleteProject, setShowDeleteProject] = useState<boolean>(false);
  const deleteProjectFunc = () => dispatch(deleteProject(project));

  return (
    <motion.div
      variants={variantItem}
      className='project-card bordered-container'
    >
      <DeleteModal
        showDeleteModal={showDeleteProject}
        setShowDeleteModal={setShowDeleteProject}
        onDeleteFunction={deleteProjectFunc}
        componentNameToDelete='Project'
      />

      {toggleOptions ? (
        <ProjectOptions
          project={project}
          setShowDeleteProject={setShowDeleteProject}
          setToggleOptions={setToggleOptions}
          setShowEditProjectModal={setShowEditProjectModal}
          setProjectToEdit={setProjectToEdit}
        />
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
      <ProjectCardContents project={project} />
      {/* <div>{project.projectDescription}</div> */}
    </motion.div>
  );
};

export default ProjectCard;
