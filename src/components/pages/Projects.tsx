import React, { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addProject, deleteProject, logoutUser } from "../../slices/userSlice";
import { RootState } from "../../app/store";
import type { Project } from "../../app/types";

import "../styles/Projects.css";
import Modalbackground from "../ModalContainer";

// MUI components
import { Button, TextField } from "@mui/material";

const Projects: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects: Project[] = useAppSelector(
    (state: RootState) => state.userReducer.activeUser.projects
  );

  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);

  const showModal = () => {
    setShowProjectModal(true);
  };

  return (
    <div className='projects page'>
      <div className='page-header'>
        <div className='page-title header2'>Projects {projects.length}</div>

        {/* <button
          className='create-new-project default-button bordered-button'
          onClick={showModal}
        >
          Create new project 
        </button>*/}

        <Button variant='outlined' onClick={showModal}>
          Create new project
        </Button>
      </div>

      {projects !== undefined
        ? projects.map((project, i) => (
            <div key={i}>
              <div>{project.projectTitle}</div>
              <div>{project.projectDescription}</div>

              <Button
                variant='contained'
                onClick={() => dispatch(deleteProject(project))}
              >
                Delete project
              </Button>
            </div>
          ))
        : null}

      <Button
        variant='outlined'
        color='error'
        onClick={() => dispatch(logoutUser())}
      >
        Log out
      </Button>

      {showProjectModal ? (
        <ProjectModal
          showProjectModal={showProjectModal}
          setShowProjectModal={setShowProjectModal}
        />
      ) : null}
    </div>
  );
};

/** CREATE PROJECT MODAL */

interface ProjectModalProps {
  showProjectModal: boolean;
  setShowProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectModal: React.FC<ProjectModalProps> = (props) => {
  const projects = useAppSelector(
    (state: RootState) => state.userReducer.activeUser.projects
  );
  const dispatch = useAppDispatch();
  const { showProjectModal, setShowProjectModal } = props;

  const projectNameRef = useRef<HTMLInputElement>(null);
  const projectDescriptionRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  const [titleExistErr, setTitleExistErr] = useState<boolean>(false);

  const handleSubmitAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      projectNameRef?.current?.value === "" ||
      projectNameRef?.current?.value === undefined
    ) {
      console.log("Project name can't be empty.");
      return;
    }

    const projectTitle = projectNameRef.current.value;
    const isProjectTitleExists = projects.find(
      (proj) => projectTitle === proj.projectTitle
    );

    if (isProjectTitleExists) {
      console.log("Project name already exist.");
      setTitleExistErr(true);
      return;
    }

    setTitleExistErr(false);

    console.log("New project is now creating.");

    const newProjectToAdd: Project = {
      projectTitle,
      projectDescription:
        projectDescriptionRef?.current?.value || "No description.",
      dateCreated: new Date().toString(),
      dueDate: dueDateRef?.current?.value,
      id: projects.length === 0 ? 0 : projects[projects.length - 1].id + 1,
    };

    dispatch(addProject(newProjectToAdd));
  };

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  const nameValueOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  };

  return (
    <>
      <div className='create-project-modal bordered-container'>
        <div className='modal-header header2'>Create Project</div>

        <form name='create-project' onSubmit={handleSubmitAddProject}>
          <div className='input-container'>
            <div className='label'>Project name</div>
            <input
              type='text'
              className='text-box'
              placeholder='Project name'
              onChange={nameValueOnChange}
              ref={projectNameRef}
            />
            {titleExistErr ? (
              <Button color='primary' variant='contained' className='label'>
                Title already exists
              </Button>
            ) : null}
          </div>

          <div className='input-container'>
            <div className='label'>Project description</div>
            <input
              type='text'
              className='text-box'
              placeholder="What's about it?"
              ref={projectDescriptionRef}
            />
          </div>

          <div className='input-container'>
            <div className='label'>Due date</div>
            <input
              type='date'
              className='text-box'
              placeholder='Due date'
              ref={dueDateRef}
            />
          </div>

          <div className='modal-buttons'>
            <input
              type='submit'
              disabled={submitDisabled}
              className='default-button'
            />
            <button
              className='default-button bordered-button'
              onClick={() => setShowProjectModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <Modalbackground
        showModal={showProjectModal}
        setShowModal={setShowProjectModal}
      />
    </>
  );
};

export default Projects;
