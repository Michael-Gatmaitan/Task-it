import { FC } from "react";
import { Chip } from "@mui/material";
import ProjectProgress from "./ProjectProgress";
import type { Project } from "../../../../types/types";
import "../../../styles/projects/projectCard/ProjectCardContents.css";

const ProjectCardContents: FC<{ project: Project }> = (props: {
  project: Project;
}) => {
  const { project } = props;

  return (
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
  );
};

export default ProjectCardContents;
