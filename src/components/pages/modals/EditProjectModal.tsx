import React, { useEffect, useState } from "react";
import { editProject } from "../../../slices/userSlice";
import { useAppDispatch } from "../../../app/hooks";
import { Button, TextField, Chip } from "@mui/material";
import type { Project, EditableProjectValues } from "../../../types/types";
// import "../../styles/modals/CreateProjectModal.css";

interface EditProjectModalProps {
  projectToEdit: Project | undefined;
  setProjectToEdit: React.Dispatch<React.SetStateAction<Project | undefined>>;
  setShowEditProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProjectModal: React.FC<EditProjectModalProps> = (
  props: EditProjectModalProps
) => {
  const dispatch = useAppDispatch();
  const { projectToEdit, setProjectToEdit, setShowEditProjectModal } = props;

  const initialState: EditableProjectValues = {
    projectTitle: "",
    projectDescription: "",
    tags: [],
    dueDate: "",
  };

  const handleSubmitEditProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (projectToEdit === undefined) {
      console.log("Project to edit is undefined");
      return;
    }

    const editedProject = {
      projectTitle:
        projectTitle === "" ? projectToEdit.projectTitle : projectTitle,
      projectDescription:
        projectDescription === ""
          ? projectToEdit.projectDescription
          : projectDescription,
      tags: combinedTags,
      dueDate: dueDate,
    };

    setShowEditProjectModal(false);
    dispatch(
      editProject({
        editedProject: editedProject,
        editedProjectID: projectToEdit.projectID,
      })
    );
  };

  useEffect(() => {
    if (projectToEdit !== undefined) console.log(projectToEdit.tags);
  }, [projectToEdit]);

  const propagationStopper = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  const [newTagValue, setNewTagValue] = useState<string>("");

  const [{ projectTitle, projectDescription, tags, dueDate }, setInitialState] =
    useState<EditableProjectValues>(initialState);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInitialState((prevState) => ({ ...prevState, [name]: value }));
  };

  const [combinedTags, setCombinedTags] = useState<string[]>([]);

  useEffect(() => {
    if (projectToEdit === undefined) return;

    const projectToEditTags = projectToEdit.tags;

    setCombinedTags([...projectToEditTags, ...tags]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Adding tags
  const handleSubmitTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setInitialState((prevState) => {
      return {
        ...prevState,
        tags: [...tags, newTagValue.trim()],
      };
    });

    setCombinedTags((prevTags) => [...prevTags, newTagValue.trim()]);

    setNewTagValue("");
  };

  const handleCloseEditProjectModal = () => {
    setShowEditProjectModal(false);
    setProjectToEdit(undefined);
  };

  return (
    <div
      className='modal-container-background'
      onClick={handleCloseEditProjectModal}
    >
      {projectToEdit !== undefined ? (
        <div
          className='edit-project-modal bordered-container'
          onClick={propagationStopper}
        >
          <div className='modal-header header2'>Edit Project</div>

          <form
            className='modal-form'
            id='create-project-form'
            name='create-project-form'
            onSubmit={handleSubmitEditProject}
          >
            <TextField
              autoFocus
              variant='outlined'
              label='Edit project name'
              defaultValue={projectToEdit.projectTitle}
              name='projectTitle'
              onChange={handleOnChange}
            />

            <TextField
              variant='outlined'
              label='Edit Description'
              defaultValue={projectToEdit.projectDescription}
              name='projectDescription'
              onChange={handleOnChange}
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
              {combinedTags.map((tag, i) => (
                <Chip
                  label={tag}
                  color='primary'
                  key={i}
                  onDelete={() => {
                    setCombinedTags(
                      combinedTags.filter((_, tag_idx) => tag_idx !== i)
                    );
                  }}
                />
              ))}
            </div>

            <div className='label'>Due date</div>
            <input
              type='date'
              className='text-box'
              placeholder='Due date'
              value={dueDate}
              name='dueDate'
              onChange={handleOnChange}
            />

            <div className='modal-buttons'>
              <Button type='submit' variant='contained'>
                Edit
              </Button>

              <Button
                variant='outlined'
                onClick={() => setShowEditProjectModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div> There's is no project to eidt.!!!</div>
      )}
    </div>
  );
};

export default EditProjectModal;
