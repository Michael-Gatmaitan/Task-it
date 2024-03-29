import React, { useState, useEffect } from "react";
import {
  addProject,
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

// Framer motion
import { motion } from "framer-motion";
import { variantsForModals } from "../../../framer-motion-variants.ts";

/** CREATE PROJECT MODAL */

interface CreateProjectModalProps {
  setShowCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = (
  props: CreateProjectModalProps
) => {
  const projects = useAppSelector(
    (state: RootState) => state.userReducer.activeUser.projects
  );
  const dispatch = useAppDispatch();

  const { setShowCreateProjectModal } = props;

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
    setShowCreateProjectModal(false);
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

  const toggleShowCreateProjectModal = () =>
    setShowCreateProjectModal((p) => !p);

  return (
    <div
      className='modal-container-background'
      onClick={toggleShowCreateProjectModal}
    >
      <motion.div
        {...variantsForModals}
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

            <Button variant='outlined' onClick={toggleShowCreateProjectModal}>
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateProjectModal;
