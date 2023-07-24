import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addProject,
  getActiveUser,
  // editProject,
  // getActiveUser,
} from "../../../slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import type { Project } from "../../../types/types";
import "../../styles/modals/CreateProjectModal.css";

// MUI
import { Button, TextField, Chip } from "@mui/material";
import { propagationStopper } from "./propagationStopper";

/** CREATE PROJECT MODAL */

const CreateProjectModal: React.FC = () => {
  const navigate = useNavigate();
  const projects = useAppSelector(
    (state: RootState) => state.userReducer.activeUser.projects
  );
  const { userID } = useAppSelector(getActiveUser);
  const dispatch = useAppDispatch();

  // Rework the states
  const [projectTitle, setProjectTitle] = useState<string>("");

  const [projectDescription, setProjectDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const [tags, setTags] = useState<string[]>([]);
  const [newTagValue, setNewTagValue] = useState<string>("");

  const [isTitleExists, setIsTitleExists] = useState(true);

  useEffect(() => {
    setIsTitleExists(
      projects.findIndex((pr) => pr.projectTitle === projectTitle) !== -1
    );
  }, [projects, projectTitle]);

  const handleSubmitAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectTitle === "") {
      console.log("Project name can't be empty.");
      return;
    }

    console.log("New project is now creating.");

    const newProjectToAdd: Project = {
      projectTitle,
      projectDescription:
        projectDescription === "" ? "No description." : projectDescription,
      dateCreated: new Date().toString(),
      dueDate: dueDate,
      tags: tags,
      boards: [],
      favorite: false,
      done: false,
      projectID:
        projects.length === 0 ? 0 : projects[projects.length - 1].projectID + 1,

      totalTodos: 0,
      completedTodos: 0,
    };

    dispatch(addProject(newProjectToAdd));

    // Redirect
    navigate(`/${userID}/projects`);
  };

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    setSubmitDisabled(projectTitle.trim() === "" || isTitleExists);
  }, [projectTitle, isTitleExists]);

  const handleSubmitTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setTags([...tags, newTagValue.trim()]);
    setNewTagValue("");

    console.log("Submit tag...");
  };

  const navigateToProjects: React.MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = () => {
    navigate(`/${userID}/projects`);
  };

  return (
    <div className='modal-container-background' onClick={navigateToProjects}>
      <div
        className='create-project-modal bordered-container modal'
        onClick={propagationStopper}
      >
        <div className='modal-header header2'>Create Project</div>

        <form
          className='modal-form'
          id='create-project-form'
          name='create-project-form'
          onSubmit={handleSubmitAddProject}
        >
          <TextField
            autoFocus
            variant='outlined'
            label={isTitleExists ? "Title already exists" : "Project name"}
            error={isTitleExists}
            onChange={(e) => setProjectTitle(e.target.value)}
          />

          <TextField
            variant='outlined'
            label='Description (Optional)'
            onChange={(e) => setProjectDescription(e.target.value)}
          />

          <div className='create-tag-form' id='create-tag-form'>
            <TextField
              variant='outlined'
              label='Add tag'
              value={newTagValue}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setNewTagValue(e.target.value)}
            />
            <Button
              variant='contained'
              disabled={newTagValue === ""}
              onClick={handleSubmitTag}
            >
              Add tag
            </Button>
          </div>

          <div className='tags-container'>
            {tags.map((tag, i) => (
              <Chip
                label={tag}
                color='primary'
                key={i}
                onDelete={() => {
                  setTags(tags.filter((_, tag_idx) => tag_idx !== i));
                }}
              />
            ))}
          </div>

          <div className='label'>Due date</div>
          <input
            type='date'
            className='text-box'
            placeholder='Due date'
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div className='modal-buttons'>
            <Button type='submit' variant='contained' disabled={submitDisabled}>
              Create
            </Button>

            <Button variant='outlined' onClick={navigateToProjects}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
