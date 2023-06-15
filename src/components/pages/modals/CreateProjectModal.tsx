import React, { useState, useEffect } from "react";
import { addProject } from "../../../slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import type { Project } from "../../../app/types";

// MUI
import { Button, TextField } from "@mui/material";

import Modalbackground from "../../ModalContainer";

/** CREATE PROJECT MODAL */

interface CreateProjectModalProps {
  showCreateProjectModal: boolean;
  setShowCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = (props) => {
  const projects = useAppSelector(
    (state: RootState) => state.userReducer.activeUser.projects
  );
  const dispatch = useAppDispatch();
  const { showCreateProjectModal, setShowCreateProjectModal } = props;

  // Rework the states
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const [titleExistErr, setTitleExistErr] = useState<boolean>(false);

  const handleSubmitAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectTitle === "") {
      console.log("Project name can't be empty.");
      return;
    }

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
        projectDescription === "" ? "No description." : projectDescription,
      dateCreated: new Date().toString(),
      // This should be able to create a date using Date object
      dueDate: dueDate,
      id: projects.length === 0 ? 0 : projects[projects.length - 1].id + 1,
    };

    dispatch(addProject(newProjectToAdd));
  };

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    setSubmitDisabled(projectTitle.trim() === "");
  }, [projectTitle]);

  return (
    <>
      <div className='create-project-modal bordered-container'>
        <div className='modal-header header2'>Create Project</div>

        <form name='create-project' onSubmit={handleSubmitAddProject}>
          <div className='input-container'>
            <TextField
              variant='outlined'
              label='Project name'
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            {titleExistErr ? (
              <Button color='primary' variant='contained' className='label'>
                Title already exists
              </Button>
            ) : null}
          </div>

          <div className='input-container'>
            <TextField
              variant='outlined'
              label='Description (Optional)'
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>

          <div className='input-container'>
            <div className='label'>Due date</div>
            <input
              type='date'
              className='text-box'
              placeholder='Due date'
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className='modal-buttons'>
            <Button type='submit' variant='contained' disabled={submitDisabled}>
              Create
            </Button>

            <Button
              variant='outlined'
              onClick={() => setShowCreateProjectModal(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      <Modalbackground
        showModal={showCreateProjectModal}
        setShowModal={setShowCreateProjectModal}
      />
    </>
  );
};

export default CreateProjectModal;
