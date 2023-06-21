import React, { useState, useEffect } from "react";
import { addProject } from "../../../slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import type { Project } from "../../../app/types";

// MUI
import { Button, TextField, Chip } from "@mui/material";

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

  const [newTagValue, setNewTagValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

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
      tags: tags,
      id: projects.length === 0 ? 0 : projects[projects.length - 1].id + 1,
    };

    dispatch(addProject(newProjectToAdd));
    setShowCreateProjectModal(false);
  };

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    setSubmitDisabled(projectTitle.trim() === "");
  }, [projectTitle]);

  const propagationStopper = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  const handleSubmitTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setTags([...tags, newTagValue.trim()]);
    setNewTagValue("");

    console.log("Submit tag...");
  };

  useEffect(() => {
    if (titleExistErr) {
      setTimeout(() => setTitleExistErr(false), 2000);
    }
  }, [titleExistErr]);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  return (
    <div
      className='create-project-modal bordered-container'
      onClick={propagationStopper}
    >
      <div className='modal-header header2'>Create Project</div>

      <form
        id='create-project-form'
        name='create-project-form'
        onSubmit={handleSubmitAddProject}
      >
        <TextField
          variant='outlined'
          label='Project name'
          onChange={(e) => setProjectTitle(e.target.value)}
        />

        {titleExistErr ? "Project title exists." : null}

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
              onDelete={() => {
                console.log("delete");
              }}
              key={i}
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

          <Button
            variant='outlined'
            onClick={() => setShowCreateProjectModal(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectModal;
