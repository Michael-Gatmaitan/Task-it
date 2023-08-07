import type { Project } from "../../../../types/types";
import { TaskAltRounded } from "@mui/icons-material";
import "../../../styles/projects/projectCard/ProjectProgress.css";
interface ProjectProgressProps {
  project: Project;
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

export default ProjectProgress;
